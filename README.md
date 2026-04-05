# wte

`wte (What To Eat)` is an MVP implementation of the PRD in this repository. It ships with:

- Spring Boot backend for recipe cards, pantry recommendation, and TDEE-based meal planning
- Vue 3 frontend with three product surfaces from the PRD
- Docker files and local run instructions

## Structure

- `backend`: Java 17, Spring Boot 3.3
- `frontend`: Vue 3 + Vite + TypeScript

## Run locally

### Backend

```bash
cd backend
./gradlew.bat test
./gradlew.bat bootRun
```

The backend runs on `http://localhost:8080`.
Java 17 is required to run the backend build.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

## Environment

- `VITE_API_BASE_URL`: overrides the frontend API base URL
- `wte.frontend-origin`: allowed CORS origin for the backend

## Notes

- External shopping and image URLs are wired as static placeholders suitable for MVP demos.
- The AI dietitian is implemented as a deterministic rules engine so the project works without API keys.
