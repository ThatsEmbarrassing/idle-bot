FROM node:18-alpine AS base

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app
RUN npm i -g turbo
COPY . .
RUN turbo prune @idle-discord-bot/discord --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY tsconfig.json tsconfig.json
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN npm i -g pnpm turbo
RUN pnpm i --frozen-lockfile --ignore-scripts -r

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN turbo build --filter=@idle-discord-bot/discord

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 discordbot
RUN adduser --system --uid 1001 discordbot
USER discordbot
COPY --from=installer /app .

CMD ["node",  "/app/services/discord/dist/main.js"]
