## ADDED Requirements

### Requirement: Landing page for unauthenticated users

The system SHALL present a **responsive landing page** at the primary marketing entry route with a **warm cream** page background and **sage green** primary call-to-action styling for the main **Get Started** control.

#### Scenario: Anonymous visitor sees landing

- **WHEN** an unauthenticated user opens the landing route
- **THEN** the system SHALL display the landing experience with the prescribed palette and a clear **Get Started** (or **Login with Google**) control

#### Scenario: Authenticated user does not stay on landing

- **WHEN** an authenticated user navigates to the landing route
- **THEN** the system SHALL redirect them to the **dashboard** default route without requiring another sign-in

### Requirement: Get Started leads to authentication

The system SHALL use the landing primary action to begin **Google** authentication per `echo-google-auth-session`.

#### Scenario: User taps Get Started

- **WHEN** the user activates **Get Started** on the landing page
- **THEN** the system SHALL initiate Google sign-in flow
