# Helplytics AI Frontend

Next.js frontend for the Helplytics AI platform.

## Included Screens

- Landing page
- Auth page
- Onboarding page
- Dashboard
- Explore feed
- Create request
- Request detail
- Messaging
- Leaderboard
- AI Center
- Notifications
- Profile

## Frontend Structure

```text
frontend
|-- app
|-- components
|-- lib
|-- public
`-- package.json
```

## Notes

- The UI uses card-heavy layouts, warm neutral surfaces, and teal/amber accents for a startup-like feel.
- API calls use graceful mock fallbacks so demos can still render if the backend has not been seeded yet.
- Session state is stored in localStorage for hackathon speed.

## Run

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```
