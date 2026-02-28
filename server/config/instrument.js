import "dotenv/config"
import * as Sentry from "@sentry/node"
import { nodeProfilingIntegration } from "@sentry/profiling-node"

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration(),
  ],
  tracesSampleRate: 1.0,
})

console.log("Sentry initialized")
