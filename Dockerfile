# Base Image
FROM node:20.18.0-slim AS base

# Enable Corepack and Prepare PNPM
RUN corepack enable
RUN corepack prepare pnpm@9.12.1 --activate

# Set the working directory
WORKDIR /backoffice

# Set environment variables
ARG VITE_BASE_URL
ENV VITE_BASE_URL=${VITE_BASE_URL}

# Copy dependency files
COPY package.json .npmrc pnpm-lock.yaml /backoffice/

# Install dependencies (only for development)
RUN pnpm install --frozen-lockfile

# Copy the entire project into the container
COPY . .

# Build Stage
FROM base AS build

# Set environment to production
ENV NODE_ENV=production

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod

# Build the application
RUN pnpm run build

# Production Image
FROM node:20.18.0-slim AS production

# Enable Corepack and Prepare PNPM
RUN corepack enable
RUN corepack prepare pnpm@9.12.1 --activate

# Set the working directory
WORKDIR /backoffice

# Copy the build output from the previous stage
COPY --from=build /backoffice/dist /backoffice/dist

# Copy necessary files for serving the app
COPY --from=build /backoffice/package.json /backoffice/pnpm-lock.yaml /backoffice/.npmrc /backoffice/

# Install Serve globally
RUN pnpm install -g serve

# Expose the port the app will run on
EXPOSE 4000

# Command to run the app
CMD ["serve", "-s", "dist", "-p", "4000"]
