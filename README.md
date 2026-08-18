# free

**The verified $0 stack for shipping an AI side-project.** Exact, current free-tier limits for every layer you need to build and run an AI app without paying — LLM APIs, vector DBs, GPU, auth, email, background jobs, storage, observability — as human-readable tables, raw JSON, and an MCP server.

Big lists like free-for.dev tell you a free tier *exists*, across thousands of services, mostly undated. **`free` goes the other way: one focused, opinionated stack, every number verified on the official pricing page with a date on it, and machine-readable.** Fewer services, but the ones you actually wire together — and you can trust the limits.

## The stack

**No credit card needed** (verified): Clerk, Auth0, Postmark, PostHog, Langfuse, Weaviate, Inngest, Braintrust — sign up and build. The `Card?` column below flags the rest.

<!-- TABLE:START -->

### llm-api

| Service | Free tier | Card? | Verified |
|---|---|---|---|
| [Cerebras Cloud](https://www.cerebras.ai/pricing) | **none** | yes | 2026-08-15 |
| [Cohere](https://cohere.com/pricing) | Chat: 20 requests/min per model; Embed: 2,000 inputs/min; Rerank: 10 requests/min; Monthly cap: 1,000 API calls/month | ? | 2026-08-15 |
| [Google Gemini API](https://ai.google.dev/gemini-api/docs/pricing) | API tokens (input & output): Free on eligible models (Gemini 3.7 Flash, 3.6 Flash, 3.5 Flash / Flash-Lite, 3.1 Flash-Lite, 3 Flash Preview, 2.5 Pro / Flash / Flash-Lite, 2.0 Flash / Flash-Lite (deprecated), Live/TTS/Native Audio previews, Lyria 3, Gemini Embedding / Embedding 2, Robotics ER previews, Gemma 4), subject to per-model rate limits; Google Search grounding: 500 requests/day (shared between Flash and Flash-Lite); Google AI Studio (web UI): Free of charge in all available regions | no | 2026-08-15 |
| [Groq API](https://console.groq.com/docs/rate-limits) | Requests (openai/gpt-oss-120b, openai/gpt-oss-20b, qwen/qwen3.6-27b, groq/compound, groq/compound-mini, allam-2-7b, whisper-large-v3(-turbo)): per-model RPM/RPD/TPM/TPD caps — exact numbers only visible on your own dashboard's Limits page | no | 2026-08-17 |
| [Hugging Face](https://huggingface.co/pricing) | Inference Providers credits: $0.10/month; Spaces hardware: CPU Basic 2 vCPU / 16 GB RAM, free; Spaces GPU: ZeroGPU available free | ? | 2026-08-15 |
| [OpenRouter](https://openrouter.ai/docs/api/reference/limits) | Free-model requests (no credits purchased): 50 requests/day; Free-model requests (after buying $10+ credits): 1,000 requests/day; Free-model request rate: 20 requests/minute | no | 2026-08-15 |
| [Z.ai (Zhipu)](https://docs.z.ai/guides/overview/pricing) | Models: GLM-4.7-Flash, GLM-4.5-Flash (text), GLM-4.6V-Flash (vision); Rate limits: not published | no | 2026-08-17 |

### vector

| Service | Free tier | Card? | Verified |
|---|---|---|---|
| [Pinecone](https://www.pinecone.io/pricing/) | Storage: Up to 2 GB; Indexes: Up to 5 indexes; Write units: 2M/month; Read units: 1M/month; Egress: 1 GB/month | ? | 2026-08-15 |
| [Qdrant Cloud](https://qdrant.tech/pricing/) | Free cluster: 1 single-node cluster; Resources: 0.5 vCPU / 1 GB RAM / 4 GB disk; Cloud inference: Free with selected models | ? | 2026-08-15 |
| [Weaviate Cloud](https://weaviate.io/pricing) | Memory: 1 GB; Disk: 10 GB; Objects: 100,000 max; Collections: 1 collection, up to 3 tenants; Embeddings: 2,000 requests/day; Query Agent: 1,000 requests/month | no | 2026-08-15 |

### ml-compute

| Service | Free tier | Card? | Verified |
|---|---|---|---|
| [Modal](https://modal.com/pricing) | Compute credits: $30/month free | ? | 2026-08-15 |

### compute

| Service | Free tier | Card? | Verified |
|---|---|---|---|
| [Cloudflare Workers](https://developers.cloudflare.com/workers/platform/pricing/) | Worker requests: 100,000 requests/day; CPU time: 10 ms/invocation; Static assets (Workers/Pages): Unlimited requests; KV reads: 100,000 reads/day; KV writes: 1,000 writes/day; KV storage: 1 GB total; D1 rows read: 5 million rows/day; D1 rows written: 100,000 rows/day; D1 storage: 5 GB total; R2 storage: 10 GB-month/month; R2 Class A operations: 1 million requests/month; R2 Class B operations: 10 million requests/month; R2 egress: Free (unlimited) | no | 2026-08-15 |
| [Deno Deploy](https://deno.com/deploy/pricing) | Requests: 1,000,000 requests/month; Egress bandwidth: 20 GB/month; CPU time: 15 hours/month; Memory time: 350 GB-hours/month; KV storage: 1 GiB; KV read units: 450,000 reads/month; KV write units: 300,000 writes/month; Volume storage: 1 GiB; Active deployments: 20 max; Custom domains: 50 per organization; Team members: 5; Log retention: 1 day | ? | 2026-08-15 |
| [Fly.io](https://fly.io/docs/about/pricing/) | **none** | no | 2026-08-15 |
| [Inngest](https://www.inngest.com/pricing) | Executions: 50,000/month; Concurrency: 5 concurrent; Events: 500,000/month; Span data: 500 MB/month; Realtime: 50 connections | no | 2026-08-15 |
| [Railway](https://railway.com/pricing) | Trial credit: $5 one-time, valid 30 days; Free plan credit: $1/month (non-rolling); RAM (Free plan, per service): 0.5 GB; CPU (Free plan, per service): 1 vCPU; Volume storage (Free plan): 0.5 GB | no | 2026-08-15 |
| [Render](https://render.com/docs/free) | Web service instance hours: 750 instance hours/workspace/calendar month; Free instance size: 512 MB RAM / 0.1 CPU; Static sites: Free to deploy (Hobby workspace capped at 25 services total); Bandwidth (outbound): 5 GB/month (Hobby workspace included allotment); PostgreSQL (free): 1 GB storage, expires 30 days after creation; Key Value (Redis-compatible): 1 free instance/workspace; Custom domains: 2 included on Hobby workspace | no | 2026-08-15 |
| [Trigger.dev](https://trigger.dev/pricing) | Credits: $5/month free; Concurrency: 20 concurrent runs; Team members: 5; Schedules: 10; Retention: 1-day logs | ? | 2026-08-15 |

### hosting

| Service | Free tier | Card? | Verified |
|---|---|---|---|
| [Netlify Free](https://www.netlify.com/pricing/) | Credits: 300 credits/month; Bandwidth: 20 credits per GB (~15 GB/month if used only on bandwidth); Production deploys: 15 credits per production deploy (~20 deploys/month if used only on deploys); Compute (functions): 10 credits per GB-hour; Web requests: 2 credits per 10,000 requests; AI inference: 180 credits per USD of AI model usage; Form submissions: Unlimited; Concurrent builds: 1; Projects (sites): 500 projects; Netlify Database: 3 databases, 20 active branches, 7-day backup retention | no | 2026-08-15 |
| [Vercel](https://vercel.com/docs/plans/hobby) | Fast Data Transfer (bandwidth): 100 GB/month; Function Invocations: 1,000,000/month; Functions Active CPU: 4 CPU-hours/month; Functions Provisioned Memory: 360 GB-hrs/month; Edge Requests: 1,000,000/month; Function max duration: 300 seconds (5 min); Deployments: 100/day; Projects: 200; Image Transformations: 5,000/month; Blob Storage: 1 GB/month; Fast Origin Transfer: 10 GB/month; ISR Reads: 1,000,000/month; Edge Config Reads: 100,000/month; Web Analytics Events: 50,000/month; Speed Insights: 10,000 events/month, 1 project; Sandbox Active CPU: 5 hours/month; Domains per project: 50; Build machine: 2 vCPUs, 8 GB memory, 32 GB disk; Runtime Logs: 1 hour retention; Workflow Events: 50,000/month | ? | 2026-08-15 |

### database

| Service | Free tier | Card? | Verified |
|---|---|---|---|
| [Convex](https://www.convex.dev/pricing) | Function calls: 1M/month; Database storage: 0.5 GB; Bandwidth: 1 GB/month; Deployments: 40 | ? | 2026-08-15 |
| [MongoDB Atlas (M0 Free Cluster)](https://www.mongodb.com/pricing) | Storage: 512 MB (0.5 GB) total; Operations: 100 operations/second; Data transfer: 10 GB in / 10 GB out per 7-day rolling period; Connections: 500 concurrent connections; Sort memory: 32 MB in-memory sort limit; Databases/Collections: 100 databases, 500 collections total; Clusters: 1 free cluster per project | no | 2026-08-15 |
| [Neon](https://neon.com/pricing) | Compute: 100 CU-hours/project/month; Storage: 0.5 GB/project; Projects: 100 projects; Branches: 10 branches/project; Data transfer (egress): 5 GB public network egress/month; Snapshots: 1 manual snapshot/project; History (point-in-time restore): 6 hours (1 GB limit); Auth monthly active users: 60,000 MAU; Monitoring retention: 1 day | no | 2026-08-15 |
| [Supabase](https://supabase.com/pricing) | Database size: 500 MB per project; File storage: 1 GB; Egress: 5 GB/month; Monthly active users (Auth): 50,000 MAU; Edge Function invocations: 500,000/month; Realtime concurrent connections: 200 peak concurrent; Realtime messages: 2,000,000/month; Active projects: 2 active projects | no | 2026-08-15 |
| [Turso](https://turso.tech/pricing) | Databases: 100 databases; Storage: 5 GB total; Rows read: 500,000,000 rows/month; Rows written: 10,000,000 rows/month; Syncs: 3 GB/month; Point-in-time restore: 1 day retention | no | 2026-08-15 |
| [Upstash Redis](https://upstash.com/pricing) | Commands: 500,000 commands/month; Data size: 256 MB; Bandwidth: 10 GB/month; Databases: 1 free database | no | 2026-08-15 |

### storage

| Service | Free tier | Card? | Verified |
|---|---|---|---|
| [Tigris](https://www.tigrisdata.com/pricing/) | Storage: 5 GB standard/month; Class A ops: 10,000 PUT/COPY/POST/LIST per month; Class B ops: 100,000 GET/other per month; Egress: Free | ? | 2026-08-15 |

### auth

| Service | Free tier | Card? | Verified |
|---|---|---|---|
| [Auth0](https://auth0.com/pricing) | Monthly active users: 25,000; Social connections: Unlimited; Enterprise connections: 1; Organizations: 5 | no | 2026-08-15 |
| [Clerk](https://clerk.com/pricing) | Monthly retained users: 50,000/month; Monthly retained orgs: 100 | no | 2026-08-15 |

### email

| Service | Free tier | Card? | Verified |
|---|---|---|---|
| [Postmark](https://postmarkapp.com/pricing) | Emails: 100/month; Retention: 45-day message retention | no | 2026-08-15 |
| [Resend](https://resend.com/pricing) | Emails: 3,000/month; Daily cap: 100 emails/day; Domains: 1; Marketing contacts: 1,000; Automation runs: 10,000/month; Retention: 30-day data | ? | 2026-08-15 |

### observability

| Service | Free tier | Card? | Verified |
|---|---|---|---|
| [Braintrust](https://www.braintrust.dev/pricing) | Scores: 10,000/month; Processed data: 1 GB/month; Retention: 14-day; Seats: Unlimited users; Credits: $10 included | no | 2026-08-15 |
| [Helicone](https://www.helicone.ai/pricing) | Requests: 10,000/month; Ingestion rate: 10 logs/min; Storage: 1 GB; Retention: 7-day | ? | 2026-08-15 |
| [Langfuse](https://langfuse.com/pricing) | Units: 50,000/month; Retention: 30-day data access; Users: 2 | no | 2026-08-15 |
| [PostHog](https://posthog.com/pricing) | Product analytics: 1M events/month; Session replay: 5,000 recordings/month; Feature flags: 1M requests/month | no | 2026-08-15 |
| [Sentry](https://sentry.io/pricing/) | Errors: 5,000/month; Spans (tracing): 5M/month; Replays: 50/month; Cron monitors: 1; Attachments: 1 GB; Seats: 1 user; Retention: 30-day | ? | 2026-08-15 |

### ci

| Service | Free tier | Card? | Verified |
|---|---|---|---|
| [GitHub](https://docs.github.com/en/billing/reference/product-usage-included) | Actions minutes: 2,000 minutes/month; Actions/Packages artifact storage: 500 MB; Codespaces compute: 120 core hours/month; Codespaces storage: 15 GB-month/month; Pages site size: 1 GB per site; Pages bandwidth: 100 GB/month (soft limit); Pages builds: 10 builds/hour (soft limit); Packages data transfer: 1 GB/month | no | 2026-08-15 |
<!-- TABLE:END -->

> A `Verified` date is a promise: someone (or CI) read the official pricing page that day. Records older than 60 days get flagged automatically.

## Use it as JSON

Every service is one JSON file under [`data/services/`](data/services/). No API key, no rate limit games:

```
https://raw.githubusercontent.com/shibu003/free/main/data/services/fly-io.json
```

## Use it from an AI agent (MCP)

Runs straight from this repo (no npm install needed; first run clones + installs, ~1 min):

```bash
claude mcp add free-tier -- npx -y github:shibu003/free
```

Or in any MCP client config:

```json
{
  "mcpServers": {
    "free-tier": { "command": "npx", "args": ["-y", "github:shibu003/free"] }
  }
}
```

Tools: `list_services(category?)` · `get_free_tier(service)` · `find_free(query)` — e.g. `find_free("postgres no credit card")`.

## Data format

One file per service, schema-validated in CI:

```json
{
  "id": "fly-io",
  "name": "Fly.io",
  "category": "compute",
  "url": "https://fly.io",
  "pricing_url": "https://fly.io/docs/about/pricing/",
  "has_free_tier": true,
  "free_tier": [{ "resource": "…", "limit": "…", "notes": "…" }],
  "credit_card_required": true,
  "verified_at": "2026-07-03",
  "sources": ["https://…"],
  "confidence": "high",
  "notes": "…"
}
```

## Contributing

Found a changed limit, a new service worth tracking, or wrong data? See [CONTRIBUTING.md](CONTRIBUTING.md) — no code required, a JSON edit and a source link is a full contribution.

## Disclosure

Some links may become referral links; they never affect what the data says. Corrections beat courtesy — if a number is wrong, [open an issue](../../issues).

## License

MIT

Contributions need a sign-off: see [CLA.md](CLA.md).

Data under `data/` is licensed separately from the code — see [DATA_LICENSE.md](DATA_LICENSE.md).
