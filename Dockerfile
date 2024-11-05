# Base

FROM node:20.18.0-slim AS base

RUN corepack enable
RUN corepack prepare pnpm@9.12.1 --activate

WORKDIR /backoffice

ARG VITE_BASE_URL

ENV VITE_BASE_URL=${VITE_BASE_URL}

COPY package.json .npmrc pnpm-lock.yaml /backoffice/

RUN pnpm install --frozen-lockfile

COPY . .

# Production

FROM base AS production

ENV NODE_ENV=production

RUN npm install -g serve

RUN npm run build

EXPOSE 4000

CMD ["serve", "-s", "dist", "-p", "4000"]