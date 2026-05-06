## ADDED Requirements

### Requirement: Dark mode form field appearance

When **`dark` is active**, native **`textarea`**, **text-like `input`** elements, and **`select`** elements SHALL use a **dark field background**, **light foreground text**, visible **borders**, and **placeholder** text that is readable but subdued compared to primary text. Checkbox, radio, range, and file inputs MAY be excluded from the default background rule if styling would break native controls.

#### Scenario: Wizard observations

- **WHEN** the user is in dark mode on an ACE step with a large observations **textarea**  
- **THEN** the control background is dark, typed text is light, and focus state remains visible

#### Scenario: General information step

- **WHEN** the user fills standard text **inputs** in dark mode  
- **THEN** those inputs match the dark field treatment

### Requirement: Theme provider attaches to document root

The application SHALL use **`next-themes`** (or equivalent) such that toggling theme applies the **`dark` class** to the **`html` (document element)** so global CSS selectors **`.dark …` and `@theme` overrides** apply consistently. The root `layout.tsx` SHALL wrap the app with the project **`EchoThemeProvider`** so all authenticated and marketing routes inherit the same mechanism.

#### Scenario: Class on root element

- **WHEN** the user switches to dark mode  
- **THEN** the **`html` element** carries the mechanism required for Tailwind/CSS dark styles (e.g. `class` includes `dark`)

#### Scenario: Provider placement

- **WHEN** the application boots  
- **THEN** **`EchoThemeProvider`** wraps the providers tree inside `RootLayout` as documented in the implementation
