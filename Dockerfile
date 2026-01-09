# Build stage
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev --production \
    && npm cache clean --force

COPY src ./src


# Runtime stage
FROM node:24-alpine AS runner

WORKDIR /app

RUN addgroup -S backendgroup && adduser -S nodeuser -G backendgroup

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/src ./src

HEALTHCHECK --interval=30s --timeout=5s \
  CMD curl -f http://localhost:9000/health || exit 1


USER nodeuser

EXPOSE 9000

CMD ["node", "src/server.js"]
