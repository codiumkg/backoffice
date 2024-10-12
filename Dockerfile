# Base

FROM node:20.17.0-alpine AS base

WORKDIR /backoffice

ARG VITE_BASE_URL

ENV VITE_BASE_URL=${VITE_BASE_URL}

COPY package*.json /

RUN npm ci

COPY . .

# Development

FROM base AS dev 

EXPOSE 4000

CMD ["npm", "run", "dev"]

# Production

FROM base AS production

WORKDIR /backoffice

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "preview"]