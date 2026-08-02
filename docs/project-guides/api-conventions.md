# API Conventions

## General approach
Keep API logic centralized and predictable.

## Recommended conventions
- Use one shared API client for default configuration
- Add request headers consistently
- Handle loading and error states in one place
- Keep feature-specific API calls in feature-level service files

## Error handling
- Show friendly error messages to the user
- Avoid exposing raw backend errors where unnecessary
- Handle unauthorized responses consistently

## Loading states
- Show global loader for long-running requests
- Avoid showing multiple loaders for the same request chain

## Response handling
- Standardize success/error response handling across all modules
- Keep response parsing logic in one place where possible
