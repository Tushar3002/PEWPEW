# Architecture Overview

## Project purpose
This application is a React-based admin dashboard for managing users, activity, venues, events, groups, reports, and master data.

## Main layers
- Presentation layer: React pages and UI components
- State layer: React context and local component state
- Data layer: API services and backend integration
- Routing layer: React Router configuration

## Key modules
- Authentication
- Dashboard
- User management
- Role and permission management
- Activity monitoring
- Venue and event management
- Group management
- Reporting and support
- Master data management

## Design principles
- Keep page logic focused and simple
- Reuse shared components where possible
- Keep API logic centralized
- Separate feature-specific code from shared infrastructure
- Prefer clarity over clever abstractions

## Suggested future improvements
- Introduce route-based code splitting
- Centralize shared API error handling
- Reduce duplicated UI logic across similar pages
- Add consistent loading and empty states
