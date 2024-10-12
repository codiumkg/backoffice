# Base

FROM node:20.18.0-slim AS base

WORKDIR /backoffice

ARG VITE_BASE_URL

ENV VITE_BASE_URL=${VITE_BASE_URL}

COPY package*.json /backoffice/

RUN npm install

COPY . .

# Development

FROM base AS dev 

ENV NODE_ENV=development

EXPOSE 4000

CMD ["npm", "run", "dev"]

# Production

FROM base AS production

ENV NODE_ENV=production

RUN npm install -g serve

RUN npm run build

EXPOSE 4000

CMD ["serve", "-s", "dist", "-p", "4000"]