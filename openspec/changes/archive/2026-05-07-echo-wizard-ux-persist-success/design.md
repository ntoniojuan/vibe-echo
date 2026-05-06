## Decisions

1. **Validation placement** — Inline alerts in the ACE column caused layout jump when `Next` failed validation. Moving copy into the **existing pinned footer** keeps scroll position stable; **toast** retained for users who expect transient feedback.
2. **Rich text** — Tiptap was evaluated and **reverted**; specs explicitly require **plain multiline** textareas.
3. **Legacy HTML** — **`readEchoObservationForPlainDisplay`** (and related helpers) strip or unwrap HTML on draft load and in read-only paths so tags never appear in a textarea.
4. **Save batch** — Firestore **batch** tied draft + `system_logs`; any audit failure failed the whole request. **Split writes**: draft first, then audit in **try/catch**, success if draft committed.
5. **Success screen** — **Card** uses `bg-echo-elevated-card`, border, `shadow-[var(--shadow-echo-card)]` for parity with summary/form cards.

## Risks / tradeoffs

- Audit log gaps if `system_logs` writes fail silently (acceptable vs blocking evaluators).
- Plain-text normalization of old HTML may lose bold/lists but preserves readable text and newlines where possible.
