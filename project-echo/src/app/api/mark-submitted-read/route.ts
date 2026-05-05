import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { markSubmittedReadRequestSchema } from "@/lib/api/markSubmittedReadRequestSchema";
import { readBearerIdTokenFromRequest } from "@/lib/api/readBearerIdTokenFromRequest";
import { echoEvaluationDraftCollectionId } from "@/lib/firebase/echoEvaluationDraftCollectionId";
import { readFirebaseAdminAuth } from "@/lib/firebase/readFirebaseAdminAuth";
import { readFirebaseAdminFirestore } from "@/lib/firebase/readFirebaseAdminFirestore";

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
    console.error("ECHO mark-submitted-read: ID token verification failed.", error);
    return NextResponse.json({ error: "Invalid or expired session." }, { status: 401 });
  }

  let jsonBody: unknown;
  try {
    jsonBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = markSubmittedReadRequestSchema.safeParse(jsonBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const evaluationDraftId = parsed.data.evaluationDraftId.trim();
  if (evaluationDraftId.length === 0) {
    return NextResponse.json({ error: "evaluationDraftId is required." }, { status: 400 });
  }

  try {
    const database = readFirebaseAdminFirestore();
    const documentReference = database.collection(echoEvaluationDraftCollectionId).doc(evaluationDraftId);
    const snapshot = await documentReference.get();
    if (!snapshot.exists) {
      return NextResponse.json({ error: "Evaluation not found." }, { status: 404 });
    }

    const record = snapshot.data();
    if (record?.status !== "submitted") {
      return NextResponse.json(
        { error: "Only submitted evaluations can be marked read." },
        { status: 409 },
      );
    }

    const evaluateeEmail = String(record.evaluateeEmail ?? "").trim().toLowerCase();
    if (evaluateeEmail !== authEmail) {
      return NextResponse.json(
        { error: "Only the evaluatee can mark this evaluation read." },
        { status: 403 },
      );
    }

    const batch = database.batch();
    batch.update(documentReference, {
      isRead: true,
      updatedAt: FieldValue.serverTimestamp(),
    });
    const logReference = database.collection("system_logs").doc();
    batch.set(logReference, {
      eventType: "edit",
      domain: "echo_evaluation_draft",
      evaluationId: evaluationDraftId,
      timestamp: FieldValue.serverTimestamp(),
      actorUid: authUid,
      actorSource: "api_mark_submitted_read_route",
      snapshotAfter: { isRead: true },
    });

    await batch.commit();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("ECHO mark-submitted-read: Firestore write failed.", error);
    return NextResponse.json({ error: "Could not mark evaluation read." }, { status: 500 });
  }
};
