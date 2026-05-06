## MODIFIED Requirements

### Requirement: Glass-like sticky appearance

The unified sticky dashboard header SHALL remain **transparent or semi-transparent** with **`backdrop-blur`** (for example `backdrop-blur-md` or stronger) in **Light** and **Midnight** so scrolling content shows through a frosted layer. The header SHALL **NOT** present as an opaque **beige**, **green-tinted**, or other solid slab that reads as a separate color block detached from the canvas.

#### Scenario: Translucent chrome in Light mode

- **WHEN** the dashboard sticky header is visible in Light mode
- **THEN** content scrolling beneath SHALL be visible through translucency and blur, and the strip SHALL NOT use an opaque beige or pastel fill

#### Scenario: Midnight glass counterpart

- **WHEN** the dashboard sticky header is visible in Midnight mode
- **THEN** the strip SHALL use backdrop blur with a **semi-transparent dark** tint (not a flat opaque panel) appropriate for readability over `#0B1120`

#### Scenario: No off-brand solid header blocks

- **WHEN** the user scrolls the dashboard inbox such that cards pass under the sticky title/tabs region
- **THEN** the sticky chrome SHALL NOT introduce a solid sage or beige rectangle that differs from the glass treatment described above
