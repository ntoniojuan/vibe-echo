/**
 * Lists Gemini models your GOOGLE_GENERATIVE_AI_API_KEY can use for generateContent.
 * Run from project-echo: npm run list-gemini-models
 */
const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim();
if (!apiKey) {
  console.error(
    "Missing GOOGLE_GENERATIVE_AI_API_KEY. Ensure project-echo/.env.local exists and run via npm run list-gemini-models (uses --env-file).",
  );
  process.exit(1);
}

const base = "https://generativelanguage.googleapis.com/v1beta/models";
const supportsGenerateContent = (model) =>
  Array.isArray(model.supportedGenerationMethods) &&
  model.supportedGenerationMethods.includes("generateContent");

let pageToken = "";
const rows = [];

for (let page = 0; page < 20; page += 1) {
  const query = new URLSearchParams({
    key: apiKey,
    pageSize: "100",
  });
  if (pageToken) {
    query.set("pageToken", pageToken);
  }
  const response = await fetch(`${base}?${query.toString()}`);
  const text = await response.text();
  let payload;
  try {
    payload = JSON.parse(text);
  } catch {
    console.error("Non-JSON response:", text.slice(0, 500));
    process.exit(1);
  }

  if (!response.ok) {
    console.error("List models failed:", response.status, payload);
    process.exit(1);
  }

  const batch = payload.models ?? [];
  for (const model of batch) {
    if (supportsGenerateContent(model)) {
      const fullName = model.name ?? "";
      const idForSdk = fullName.startsWith("models/")
        ? fullName.slice("models/".length)
        : fullName;
      rows.push({
        idForSdk,
        baseModelId: model.baseModelId ?? "(unset)",
        displayName: model.displayName ?? "",
      });
    }
  }

  pageToken = payload.nextPageToken ?? "";
  if (!pageToken) {
    break;
  }
}

rows.sort((a, b) => a.idForSdk.localeCompare(b.idForSdk));

console.log(
  "Models with generateContent (use idForSdk as GEMINI_MODEL, or try the app default gemini-2.0-flash):\n",
);
const width = Math.max(...rows.map((r) => r.idForSdk.length), 10);
for (const row of rows) {
  const pad = row.idForSdk.padEnd(width);
  console.log(`${pad}  base:${row.baseModelId}  ${row.displayName}`);
}

if (rows.length === 0) {
  console.log("(none returned — check API key and Generative Language API access.)");
}
