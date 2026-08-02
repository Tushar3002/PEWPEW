# Deployment Guide

## Pre-deployment checklist
- Ensure all environment variables are configured
- Verify the build succeeds
- Remove unused files and debug code
- Confirm API URLs and auth configuration are correct

## Build command
```bash
npm run build
```

## Deployment notes
- Serve the built files from the production host
- Make sure the SPA routing fallback is configured correctly
- Verify authentication and protected routes in the deployed environment

## Recommended improvements
- Add environment-specific configuration files if needed
- Add a staging environment for testing before production release
