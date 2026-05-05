# Deploying Firestore rules, indexes, and Cloud Functions (Project ECHO)

These artifacts live next to the Next.js app (`project-echo/`). They implement evaluation edit/delete audit logging (`system_logs`) and secure the `threadMessages` subcollection.

## Prerequisites

- Firebase CLI (`firebase login`)
- A Firebase project with Firestore enabled (set as default: `firebase use <alias>` from `project-echo/` after `firebase init` if not already linked)
- **Node 20** for Cloud Functions (see `functions/package.json` `engines`)

## One-time: link this folder

From `project-echo/`:

```bash
firebase use --add
```

Choose the MedGrocer ECHO Firebase project.

## Install and build functions

```bash
cd functions
npm install
npm run build
cd ..
```

## Deploy (rules + indexes + functions)

```bash
firebase deploy --only firestore:rules,firestore:indexes,functions
```

## IAM / security

- Cloud Functions service account must have permission to write to Firestore (`system_logs`). The default App Engine / Functions service account usually has this for the same project.
- **Actor UID**: Evaluator saves and evaluatee “mark read” run through **callable** functions (`updateEchoEvaluationDraftAudited`, `markEchoEvaluationSubmittedReadAudited`) so `system_logs` entries include the real Firebase Auth UID (`actorUid`). Refinement writes from the Next.js API route log with `actorUid: null` and `actorSource: echo_refinement_apply_route`. Hard deletes still use the `auditEchoEvaluationDraftDeleted` trigger (`actorUid: null`, `firestore_trigger_v2_delete`).

## Environment

- Optionally set `GCLOUD_PROJECT` or rely on Firebase `initializeApp()` default credentials in production.
- For regional policy, adjust `region` in `functions/src/index.ts` (default `us-central1`).
