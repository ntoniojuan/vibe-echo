import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { readBearerIdTokenFromRequest } from "@/lib/api/readBearerIdTokenFromRequest";
import { saveDraftRequestSchema } from "@/lib/api/saveDraftRequestSchema";
import { readFirebaseAdminAuth } from "@/lib/firebase/readFirebaseAdminAuth";
import { readFirebaseAdminFirestore } from "@/lib/firebase/readFirebaseAdminFirestore";
import { echoEvaluationDraftCollectionId } from "@/lib/firebase/echoEvaluationDraftCollectionId";

export const runtime = "nodejs";

export const POST = async (request: Request) => {
  const idToken = readBearerIdTokenFromRequest(request);
  if (!idToken) {
    return NextResponse.json({ error: "Missing or invalid Authorization header." }, { status: 401 });
  }

  let authUid: string;
  let authEmail: string;
  try {
    const adminAuth = readFirebaseAdminAuth();
    const decoded = await adminAuth.verifyIdToken(idToken);
    const email = typeof decoded.email === "string" ? decoded.email.trim().toLowerCase() : "";
    if (!decoded.uid || email.length === 0) {
      return NextResponse.json({ error: "Sign-in must include an email." }, { status: 401 });
    }
    authUid = decoded.uid.trim();
    authEmail = email;
  } catch (error) {
    console.error("ECHO save-draft: ID token verification failed.", error);
    return NextResponse.json({ error: "Invalid or expired session." }, { status: 401 });
  }

  let jsonBody: unknown;
  try {
    jsonBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = saveDraftRequestSchema.safeParse(jsonBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;

  try {
    const database = readFirebaseAdminFirestore();
    const documentReference = database
      .collection(echoEvaluationDraftCollectionId)
      .doc(data.evaluationDraftId.trim());

    const snapshot = await documentReference.get();
    if (snapshot.exists) {
      const existingEvaluatorEmail = String(snapshot.data()?.evaluatorEmail ?? "")
        .trim()
        .toLowerCase();
      if (existingEvaluatorEmail.length > 0 && existingEvaluatorEmail !== authEmail) {
        return NextResponse.json(
          { error: "Not allowed to modify this evaluation." },
          { status: 403 },
        );
      }
    }

    const peerAnonymous = data.relationshipType === "colleague" ? Boolean(data.isAnonymous) : false;

    const documentPayload: Record<string, unknown> = {
      evaluateeName: data.evaluateeName,
      evaluateeEmail: data.evaluateeEmail,
      isAnonymous: peerAnonymous,
      relationshipType: data.relationshipType,
      evaluationReason: data.evaluationReason,
      aptitudeObservations: data.aptitudeObservations,
      characterObservations: data.characterObservations,
      effectivenessObservations: data.effectivenessObservations,
      gainsRatings: data.gainsRatings,
      currentStepIndex: data.currentStepIndex,
      status: data.status,
      updatedAt: FieldValue.serverTimestamp(),
      evaluatorEmail: authEmail,
      evaluatorUid: authUid,
    };

    if (data.shouldSetCreatedAt) {
      documentPayload.createdAt = FieldValue.serverTimestamp();
    }

    const snapshotForLog: Record<string, unknown> = {
      evaluateeName: data.evaluateeName,
      evaluateeEmail: data.evaluateeEmail,
      isAnonymous: peerAnonymous,
      relationshipType: data.relationshipType,
      evaluationReason: data.evaluationReason,
      aptitudeObservations: data.aptitudeObservations,
      characterObservations: data.characterObservations,
      effectivenessObservations: data.effectivenessObservations,
      gainsRatings: data.gainsRatings,
      currentStepIndex: data.currentStepIndex,
      status: data.status,
      evaluatorEmail: authEmail,
      evaluatorUid: authUid,
    };

    const batch = database.batch();
    batch.set(documentReference, documentPayload, { merge: true });
    const logReference = database.collection("system_logs").doc();
    batch.set(logReference, {
      eventType: "edit",
      domain: "echo_evaluation_draft",
      evaluationId: data.evaluationDraftId.trim(),
      timestamp: FieldValue.serverTimestamp(),
      actorUid: authUid,
      actorSource: "api_save_draft_route",
      snapshotAfter: snapshotForLog,
    });

    await batch.commit();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("ECHO save-draft: Firestore write failed.", error);
    return NextResponse.json({ error: "Could not save draft." }, { status: 500 });
  }
};
