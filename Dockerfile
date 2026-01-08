# Build stage

FROM node:24-alpine AS builder

WORKDIR /builder

COPY package*.json .

RUN npm ci --omit=dev

COPY src ./src

# Run stage
FROM node:24-alpine AS runner

WORKDIR /app

RUN addgroup -S backendgroup && adduser -S nodeuser -G backendgroup

COPY --from=builder /builder/node_modules ./node_modules
COPY --from=builder /builder/package.json ./package.json
COPY --from=builder /builder/src ./src

USER nodeuser

EXPOSE 9000

CMD [ "node", "src/server.js" ]