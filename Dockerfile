# Base

FROM node:20.17.0-alpine AS base

WORKDIR /backoffice

ARG VITE_BASE_URL

ENV VITE_BASE_URL=${VITE_BASE_URL}

COPY package*.json /

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

WORKDIR /backoffice

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "preview"]