# travlr-genom

## Environment

Create a local `.env` file based on `.env.example`.

```bash
cp .env.example .env
```

### Variables

`VITE_API_BASE_URL`
Frontend base path used by the app when calling the brand analyzer. Keep this as `/api` in local development so Vite can proxy the request and avoid browser CORS issues.

`VITE_API_PROXY_TARGET`
The actual backend target for the Vite dev proxy. In local development this should point to your analyzer server, for example `http://localhost:3000`.

## Local development

When running the app locally:

1. Start the analyzer server on the URL defined by `VITE_API_PROXY_TARGET`.
2. Start the Vite frontend.
3. Open the app and use the Brand Intelligence flow.

If you change `.env` values, restart the Vite dev server so the new configuration is picked up.
