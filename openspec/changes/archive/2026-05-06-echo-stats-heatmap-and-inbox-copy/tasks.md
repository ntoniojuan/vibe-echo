## 1. Heat map palette

- [x] 1.1 Update `readEvaluateeHeatMapPresentation` so **Severely underdelivers** uses deep **amber/orange** (not red `#D32F2F`); keep **Needs improvement** on distinct orange/amber; verify higher bands still read as GAINS-positive greens.
- [x] 1.2 Update `EvaluateeStatsHeatMapCard` legend swatches + any hard-coded legend colors to match presentation for **all five** bands including lowest tier.

## 2. Heat map mobile labels

- [x] 2.1 In `EvaluateeStatsHeatMapCard`, use responsive classes: **mobile-first** show only **`cell.code`** large/bold (and score); from **`md`+** show full **`cell.label`** in-cell; keep `title` (and optional sr-only) for full name on mobile.

## 3. Inbox copy

- [x] 3.1 Remove the ACE pillar explainer sentence from `EchoDashboardInboxCard`; adjust spacing if needed.

## 4. Verification

- [x] 4.1 `npm run lint` && `npm run build`; spot-check stats page on mobile width and desktop; confirm inbox cards show no removed sentence.
