## ADDED Requirements

### Requirement: Heat map uses three ACE rows

The Growth Analytics competency heat map SHALL render exactly twelve cells arranged as three rows and four columns, corresponding to Aptitude, Character, and Effectiveness sub-competencies respectively, with no additional empty row reserved for a fourth ACE category.

#### Scenario: No placeholder category row

- **WHEN** the user views the competency heat map with twelve populated GAINS cells
- **THEN** the grid SHALL contain three rows and four columns of competency cells
- **AND** the UI SHALL NOT display dashed padding tiles or blank fourth-category rows used solely to fill a larger grid

### Requirement: Heat map column semantics

Each column position within a row SHALL represent one sub-competency slot (four per ACE pillar), consistent with the canonical GAINS catalog ordering for that pillar.

#### Scenario: Ordering matches catalog blocks

- **WHEN** heat map data is produced from the GAINS sub-competency catalog
- **THEN** cells SHALL appear in catalog order such that the first row reflects Aptitude codes, the second Character codes, and the third Effectiveness codes
