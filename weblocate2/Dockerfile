# Use Node.js for building the project
FROM node:18-alpine AS builder

# Install pnpm globally
RUN npm install -g corepack && corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy the rest of the app
COPY . .

# Pass VITE environment variables to the build process
ARG VITE_ABUSE_API_KEY
ARG VITE_IPGEOLOCATION_API_KEY
ARG VITE_NODE_ENV

ENV VITE_ABUSE_API_KEY=${VITE_ABUSE_API_KEY}
ENV VITE_IPGEOLOCATION_API_KEY=${VITE_IPGEOLOCATION_API_KEY}
ENV VITE_NODE_ENV=${VITE_NODE_ENV}

# Expose the default Nginx port
EXPOSE 5173

CMD ["pnpm", "run", "dev", "--host"]
