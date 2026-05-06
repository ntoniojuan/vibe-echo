## ADDED Requirements

### Requirement: Heat map uses GAINS-aligned warm colors for low bands

The competency heat map SHALL map averaged GAINS-like scores to band colors such that **“Needs improvement”** and **“Severely underdelivers”** use **amber / orange** tones from the GAINS presentation palette. The **“Severely underdelivers”** band SHALL NOT use red as its primary accent (e.g. no `#D32F2F`-style error red for that band’s core treatment).

#### Scenario: Lowest band presentation

- **WHEN** a cell’s band is **Severely underdelivers**
- **THEN** its fill and accent treatments SHALL use amber/orange family colors, not red as the primary semantic color

#### Scenario: Needs improvement band

- **WHEN** a cell’s band is **Needs improvement**
- **THEN** its colors SHALL remain clearly **orange/amber** and SHALL be visually distinct from the **Severely underdelivers** band

### Requirement: Heat map legend matches cell bands

The heat map legend (or equivalent key) SHALL include swatches/labels for **all** displayed GAINS bands that cells can take, including **Severely underdelivers**, and the swatch colors SHALL match the cell styling rules.

#### Scenario: User reads legend

- **WHEN** the user views the competency heat map card
- **THEN** they SHALL be able to map each legend entry to the corresponding cell colors without a missing lowest tier

### Requirement: Mobile cells show codes prominently without full titles in-box

On **mobile** viewports (below the project’s chosen `md` breakpoint), each heat map tile SHALL display the sub-competency **code** (e.g. **A1**) in **large, bold** text and SHALL NOT show the long **full competency name** inside the tile. The full name MAY remain available via non-visual or auxiliary means (e.g. `title` tooltip, screen-reader text).

#### Scenario: Narrow viewport

- **WHEN** the viewport is mobile-width per implementation
- **THEN** in-cell content SHALL not include the full human-readable competency title string that appears today on desktop (e.g. multi-word titles like “Internal Data-literacy”)

#### Scenario: Desktop viewport

- **WHEN** the viewport is at or above the `md` breakpoint
- **THEN** the implementation MAY show the full competency label in the cell as today or an equivalent readable layout
