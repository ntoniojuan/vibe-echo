## ADDED Requirements

### Requirement: Sage baseline primary accent

The application SHALL define semantic **primary** colors whose fill tone aligns to Sage green **`#889F88`** (or a documented semantic alias derived from that value) for Light and Midnight modes, replacing accidental default **blue** Tailwind primaries on core CTAs.

#### Scenario: Primary buttons use Sage

- **WHEN** a user views standard filled primary buttons (including wizard progression where styled as primary)
- **THEN** their backgrounds SHALL resolve through the Sage-aligned primary token, not default browser / Tailwind blue defaults

### Requirement: Active navigation emphasis matches Sage

Active dashboard inbox tabs, bottom navigation active affordances (where styled as primary), and comparable **active state indicators** SHALL use the same Sage-aligned primary token for emphasis (underline, icon tint, or background) unless a distinct destructive/info semantic applies.

#### Scenario: Dashboard tab selection

- **WHEN** the user selects an inbox tab in the authenticated dashboard
- **THEN** the selected indicator styling SHALL source Sage-aligned primary tokens

### Requirement: New Evaluation CTA uses Sage primary fill

The desktop sidebar **New Evaluation** call-to-action SHALL present as a filled Sage-aligned primary surface consistent with other hero CTAs (readable label contrast preserved).

#### Scenario: Sidebar create evaluation visible on Midnight

- **WHEN** `html` carries class `dark` and the desktop sidebar is shown
- **THEN** the New Evaluation button SHALL remain visibly Sage-primary rather than reverting to a blue accent palette

### Requirement: Refine with AI uses higher-contrast deeper Sage

The **Refine with AI** affordance SHALL use a **stronger / darker Sage** semantic (`primary-strong` or equivalent) distinct from ordinary primary fills so it stays salient on both canvas and elevated cards without adopting unrelated hues.

#### Scenario: ACE refinement entry visible

- **WHEN** the user views an ACE refinement trigger adjacent to ordinary observation controls in Midnight mode
- **THEN** the Refine control SHALL render using the documented darker Sage semantic separated from standard primary fills
