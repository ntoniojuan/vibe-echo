## ADDED Requirements

### Requirement: Google sign-in

The system SHALL offer **Firebase Authentication** using the **Google** provider so a user can sign in with their Google account from the landing experience.

#### Scenario: User initiates sign-in

- **WHEN** an unauthenticated user activates **Get Started** / **Login with Google**
- **THEN** the system SHALL invoke Firebase Auth Google sign-in and, on success, SHALL establish an authenticated session for that user

#### Scenario: User signs out

- **WHEN** an authenticated user chooses **Sign out** (or equivalent control in Profile/shell)
- **THEN** the system SHALL sign the user out via Firebase Auth and SHALL run the session termination cache policy (see IT.06.POL idle logout requirement)

### Requirement: IT.06.POL 60-minute idle session timeout

The system SHALL automatically end the user session after **60 minutes** without qualifying user activity while authenticated, and SHALL perform the same cleanup as explicit sign-out.

#### Scenario: Idle timeout fires

- **WHEN** the authenticated user has had **no qualifying activity** for **60 minutes** (per product definition of activity)
- **THEN** the system SHALL sign the user out and SHALL clear local client cache per the cache-clear requirement

#### Scenario: Activity resets idle timer

- **WHEN** the user performs qualifying activity (e.g. pointer, keyboard, or scroll interactions as implemented)
- **THEN** the system SHALL reset the idle timer so the session does not expire solely due to inactive clock ticks during active reading

### Requirement: Local cache clear on logout or policy timeout

On **sign-out** or **policy-forced logout**, the system SHALL clear **client-side stored application state** so no ECHO session-scoped cache remains that would imply an active login.

#### Scenario: Logout completes cache policy

- **WHEN** logout or IT.06.POL timeout runs the termination pipeline
- **THEN** the system SHALL clear **localStorage** and **sessionStorage** keys used by Project ECHO (curated list or full clear per design) and SHALL ensure the user is returned to the **unauthenticated** experience
