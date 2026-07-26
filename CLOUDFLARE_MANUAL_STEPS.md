# Cloudflare Manual Configuration Steps

Since this project is hosted on GitHub Pages and uses Cloudflare as a proxy, certain optimizations and headers cannot be configured directly in the codebase. 

This document tracks all the manual configurations required in your Cloudflare Dashboard to ensure the site passes all PageSpeed and Agent Discoverability checks.

---

## 1. Disable Rocket Loader (Performance Optimization)
Cloudflare's Rocket Loader delays JavaScript execution but can block the initial render. Since we have manually added `defer` to all scripts in the codebase, Rocket Loader is redundant and hurts performance.
- Go to **Speed** > **Optimization** > **Content Optimization**.
- Find **Rocket Loader** and toggle it **OFF**.

---

## 2. Add Link Headers for Agent Discovery
GitHub Pages does not support the `_headers` file. To return the `Link` headers required by AI agents (RFC 8288), use Cloudflare Transform Rules.
- Go to **Rules** > **Transform Rules**.
- Click **Create Transform Rule** > **Modify Response Header**.
- Set the condition: `(http.host eq "vitabletech.in" and http.request.uri.path eq "/")`
- Set the header action: **Set static**
- Name: `Link`
- Value: `</.well-known/api-catalog>; rel="api-catalog"`
- Deploy the rule.

---

## 3. Configure DNS-AID for AI Discovery
AI agents use DNS records to discover your endpoints.
- Go to **DNS** > **Records**.
- Click **Add record**.
- **Type:** `SVCB`
- **Name:** `_a2a._agents`
- **Target:** `vitabletech.in`
- **Priority:** `1`
- **Port:** `443`
- **TTL:** `Auto`
- Add the mandatory custom parameters:
  - **alpn:** `"a2a"`
  - **mandatory:** `alpn,port`
- Save the record.

---

## 4. Enable DNSSEC
The DNS-AID specification requires the discovery zone to be signed with authenticated data.
- Go to **DNS** > **Settings**.
- Scroll to the **DNSSEC** section.
- Click **Enable DNSSEC** (if not already enabled).

---

## 5. Enable Markdown for Agents
AI agents prefer reading Markdown over HTML because HTML wastes their context limits. Cloudflare can automatically convert HTML to Markdown at the edge when an agent requests it (using the `Accept: text/markdown` header).
- Go to the **AI Crawl Control** section in your dashboard sidebar.
- Locate the **Markdown for Agents** feature.
- Toggle it **ON**.
*(Note: Cloudflare currently requires a Pro or Business plan for this specific toggle. If you do not see it, you may need to upgrade or wait for it to be released to free tiers).*

---

## 6. Override Content-Type for API Catalog
GitHub Pages serves files without extensions as `application/octet-stream`. However, the `/.well-known/api-catalog` file MUST be served as `application/linkset+json` per RFC 9727.
- Go to **Rules** > **Transform Rules**.
- Click **Create Transform Rule** > **Modify Response Header**.
- Set the condition: `(http.host eq "vitabletech.in" and http.request.uri.path eq "/.well-known/api-catalog")`
- Set the header action: **Set static**
- Name: `Content-Type`
- Value: `application/linkset+json`
- Deploy the rule.

---

## 7. Override Content-Type for OAuth Discovery
Similar to the API catalog, the `/.well-known/oauth-authorization-server` and `/.well-known/openid-configuration` files lack extensions and will be served as `application/octet-stream` by GitHub Pages. They MUST be served as `application/json`.
- Go to **Rules** > **Transform Rules**.
- Click **Create Transform Rule** > **Modify Response Header**.
- Set the condition: `(http.host eq "vitabletech.in" and (http.request.uri.path eq "/.well-known/oauth-authorization-server" or http.request.uri.path eq "/.well-known/openid-configuration"))`
- Set the header action: **Set static**
- Name: `Content-Type`
- Value: `application/json`
- Deploy the rule.

---

## 8. Override Content-Type for OAuth Protected Resource
The `/.well-known/oauth-protected-resource` file also requires the `application/json` Content-Type. You can actually just update the Transform Rule from Step 7 to include this path, or create a new one.
- Go to **Rules** > **Transform Rules**.
- Click **Create Transform Rule** > **Modify Response Header**.
- Set the condition: `(http.host eq "vitabletech.in" and http.request.uri.path eq "/.well-known/oauth-protected-resource")`
- Set the header action: **Set static**
- Name: `Content-Type`
- Value: `application/json`
- Deploy the rule.
