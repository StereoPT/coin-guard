# ============================================
# Stage 0: Base image
# ============================================

# IMPORTANT: Node.js Version Maintenance
# Keep this in sync with the node-version used in .github/workflows/ci.yml.
ARG NODE_VERSION=22-alpine

FROM node:${NODE_VERSION} AS base
RUN corepack enable

# ============================================
# Stage 1: Prune the monorepo
# ============================================

FROM base AS pruner
WORKDIR /app
COPY . .
RUN npx turbo prune @coin-guard/web --docker

# ============================================
# Stage 2: Install dependencies
# ============================================

FROM base AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

# ============================================
# Stage 3: Build
# ============================================

FROM base AS builder
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .

# Only needed to satisfy packages/db/prisma.config.ts during `prisma generate` — every page is
# force-dynamic now, so nothing actually queries this during the build.
ARG DATABASE_URL="postgresql://build:build@localhost:5432/build"
ENV DATABASE_URL=${DATABASE_URL}

RUN pnpm turbo run build --filter=@coin-guard/web

# ============================================
# Stage 4: Run Next.js application
# ============================================

FROM node:${NODE_VERSION} AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder --chown=node:node /app/apps/web/public ./apps/web/public
COPY --from=builder --chown=node:node /app/apps/web/.next/standalone ./
COPY --from=builder --chown=node:node /app/apps/web/.next/static ./apps/web/.next/static

USER node

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
EXPOSE 3000

CMD ["node", "apps/web/server.js"]
