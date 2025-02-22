# Use Node.js for building the project
FROM node:18-alpine AS builder

# Install pnpm globally and configure store
RUN npm install -g corepack && corepack enable && corepack prepare pnpm@latest --activate && \
	pnpm config set store-dir /root/.pnpm-store/v3 --global

# Set working directory
WORKDIR /app

# Copy project files
COPY . .
RUN rm -rf ./api/node_modules ./weblocate2/node_modules

# Copy package.json and install dependencies
COPY api/package.json api/pnpm-lock.yaml ./api/
COPY weblocate2/package.json weblocate2/pnpm-lock.yaml ./weblocate2/

# Install dependencies and build weblocate2
WORKDIR /app/weblocate2
RUN pnpm install --store-dir /root/.pnpm-store/v3 && pnpm add typescript
RUN pnpm build

WORKDIR /app/api
RUN pnpm install

# Pass environment variables to the build process
ARG ABUSE_API_KEY
ARG IPGEOLOCATION_API_KEY
ARG NODE_ENV

ENV ABUSE_API_KEY=${ABUSE_API_KEY}
ENV IPGEOLOCATION_API_KEY=${IPGEOLOCATION_API_KEY}
ENV NODE_ENV=${NODE_ENV}

# Expose the default Nginx port
EXPOSE 5000

CMD ["pnpm", "start"]
