#!/usr/bin/env node
// MCP server exposing the free-tier database to AI agents.
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { loadServices, findFree } from './lib.js';

const services = loadServices();
const CATEGORIES = [...new Set(services.map((s) => s.category))].sort();

const server = new McpServer({ name: 'free-tier-mcp', version: '0.1.0' });

const json = (data) => ({ content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] });

server.tool(
  'list_services',
  `List all tracked services and whether they have a free tier. Categories: ${CATEGORIES.join(', ')}.`,
  { category: z.enum(CATEGORIES).optional().describe('Filter by category') },
  async ({ category }) => {
    const rows = services
      .filter((s) => !category || s.category === category)
      .map(({ id, name, category, has_free_tier, verified_at }) => ({ id, name, category, has_free_tier, verified_at }));
    return json(rows);
  }
);

server.tool(
  'get_free_tier',
  'Get the full verified free-tier record for one service: exact limits, credit-card requirement, gotchas, sources.',
  { service: z.string().describe(`Service id, one of: ${services.map((s) => s.id).join(', ')}`) },
  async ({ service }) => {
    const s = services.find((x) => x.id === service);
    if (!s) return json({ error: `unknown service "${service}"`, known: services.map((x) => x.id) });
    return json(s);
  }
);

server.tool(
  'find_free',
  'Search free tiers by need, e.g. "postgres", "500k requests", "no credit card". Returns matching services with their limits.',
  { query: z.string().describe('Space-separated keywords; all must match') },
  async ({ query }) => json(findFree(services, query))
);

await server.connect(new StdioServerTransport());
