---
name: Project ECHO
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf1'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fa'
  on-surface: '#111c2c'
  on-surface-variant: '#424842'
  inverse-surface: '#263142'
  inverse-on-surface: '#ebf1ff'
  outline: '#737972'
  outline-variant: '#c2c8c0'
  surface-tint: '#4a654f'
  primary: '#4a654f'
  on-primary: '#ffffff'
  primary-container: '#8daa91'
  on-primary-container: '#253f2b'
  inverse-primary: '#b0ceb4'
  secondary: '#4f6073'
  on-secondary: '#ffffff'
  secondary-container: '#d2e4fb'
  on-secondary-container: '#556679'
  tertiary: '#5e5e5b'
  on-tertiary: '#ffffff'
  tertiary-container: '#a4a39f'
  on-tertiary-container: '#393936'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cceacf'
  primary-fixed-dim: '#b0ceb4'
  on-primary-fixed: '#062010'
  on-primary-fixed-variant: '#334d38'
  secondary-fixed: '#d2e4fb'
  secondary-fixed-dim: '#b7c8de'
  on-secondary-fixed: '#0b1d2d'
  on-secondary-fixed-variant: '#38485a'
  tertiary-fixed: '#e4e2dd'
  tertiary-fixed-dim: '#c8c6c2'
  on-tertiary-fixed: '#1b1c19'
  on-tertiary-fixed-variant: '#474744'
  background: '#f9f9ff'
  on-background: '#111c2c'
  surface-variant: '#d8e3fa'
typography:
  h1:
    fontFamily: Manrope
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  h2:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.3'
  h3:
    fontFamily: Manrope
    fontSize: 22px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.05em
  timer-display:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: -0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.5rem
  sm: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  container-max: 1200px
  gutter: 24px
---

## Brand & Style

This design system is built upon the "Warm Professionalism" aesthetic, tailored specifically for the healthcare evaluation context of MedGrocer. The brand personality is clinical yet compassionate, balancing the rigor of performance evaluation with the supportive nature of professional growth. 

The visual style follows a **Corporate / Modern** movement with a focus on high-legibility and calming color transitions. It avoids the coldness of traditional medical software by utilizing organic background tones and soft, tactile depth. The interface evokes a sense of trust, focus, and transparency, ensuring that both evaluators and employees feel supported through the "Evaluation of Capabilities & Holistic Objectives."

## Colors

The color palette is anchored by **Sage Green** as the primary brand driver, symbolizing growth and balance. **Deep Navy** provides the necessary professional weight for navigation and primary actions, while **Warm Cream** serves as the primary background color to reduce eye strain and differentiate from standard white-label software.

The **GAINS Scale** uses a semantic spectrum to communicate performance:
- **Emerald & Teal:** Representing high performance with cooler, confident tones.
- **Sage:** The baseline for standard performance, aligning with the primary brand color.
- **Amber & Crimson:** Providing clear, warm-toned alerts for areas requiring attention or intervention.

Backgrounds should primarily use the Warm Cream (#F9F7F2), while cards and surface containers should use pure white (#FFFFFF) to create a subtle contrast.

## Typography

The design system utilizes **Manrope** for its refined and balanced proportions, which bridge the gap between technical clarity and approachable warmth. 

- **Headlines:** Use Bold or Semi-Bold weights in Deep Navy to establish hierarchy.
- **Body Text:** Use Regular weight with generous line heights (1.5 - 1.6) for long-form evaluations and dialogues.
- **Labels:** Small caps with increased letter spacing should be used for secondary metadata or category headers.
- **Timer:** The 60-minute session countdown should use a medium weight with tabular figures to prevent horizontal jitter during the countdown.

## Layout & Spacing

The layout is a responsive system that adapts to the specific needs of evaluation sessions:

- **Desktop:** Features a persistent side-navigation (240px width) in Deep Navy. The main content area uses a 12-column grid with a max-width of 1200px.
- **Mobile:** Uses a bottom-pinned navigation bar for easy thumb access. The core navigation includes Home, Create, Stats, and Profile.
- **Dialogue Layout:** The threaded chat components utilize a staggered margin system (e.g., 24px indentation for replies) to visually represent conversation flows without overwhelming the user.
- **Consistency:** All spacing is derived from a 4px base unit, ensuring a rhythmic vertical flow.

## Elevation & Depth

This design system uses **Ambient Shadows** to create a sense of layering and focus. Depth is used functionally rather than decoratively:

- **Level 0 (Background):** Warm Cream.
- **Level 1 (Cards):** White surfaces with a soft, diffused shadow (Blur: 20px, Y: 4px, Opacity: 4%, Color: Deep Navy).
- **Level 2 (Toasts/Modals):** Floating elements with a more pronounced shadow (Blur: 30px, Y: 8px, Opacity: 8%, Color: Deep Navy).

Avoid heavy borders; instead, use tonal changes and soft shadows to define the boundaries of the 16px rounded cards.

## Shapes

The shape language combines the structural reliability of rounded rectangles with the friendliness of pill shapes.

- **Cards:** Strictly 16px corner radius to maintain a modern, friendly feel.
- **Buttons:** Fully pill-shaped (999px) to invite interaction and distinguish them from informational cards.
- **Inputs:** Slightly softer than cards at 12px radius to ensure they sit comfortably within evaluation forms.
- **Icons:** All icons within the ACE Framework (Head, Heart, Hands) should feature rounded terminals and consistent stroke weights to match the Manrope typeface.

## Components

### Navigation & Headers
- **Side Nav (Desktop):** Deep Navy background with Sage Green active states.
- **Bottom Nav (Mobile):** Glassmorphic Warm Cream background with icons for Home, Create, Stats, and Profile.
- **Header Timer:** A fixed top-bar element displaying the "60:00" countdown. As the timer drops below 5 minutes, the text color should transition to the "Severely Underdelivers" Crimson.

### Interaction Elements
- **Buttons:** Primary buttons use Deep Navy with white text; secondary buttons use Sage Green. All buttons are pill-shaped.
- **ACE Framework Icons:** 
  - **Head (Aptitude):** For technical skill metrics.
  - **Heart (Character):** For cultural fit and soft skills.
  - **Hands (Effectiveness):** For execution and output metrics.
- **Threaded Dialogue:** "Twitter-style" components with vertical connector lines for threads. Avatars should be small (32px) and circular.

### Feedback
- **Toast Notifications:** Situated at the top-center on mobile and bottom-right on desktop. Backgrounds match the GAINS scale colors depending on the message type (e.g., Green for "Saved," Amber for "Session Expiring").
- **Gains Chips:** Small, pill-shaped badges using the GAINS scale colors to indicate rating levels at a glance within cards or lists.