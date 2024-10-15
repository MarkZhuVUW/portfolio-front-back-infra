# Build stage for auth-service
FROM node:latest AS auth-service-build
WORKDIR /usr/src/app/auth-service
COPY auth-service/package*.json ./
RUN npm ci --omit=dev
COPY auth-service/ .
# RUN npm run build

# Build stage for Frontend
FROM node:latest AS frontend-build
WORKDIR /usr/src/app/frontend
COPY frontend/package*.json ./
COPY frontend/ .

# Final stage
FROM node:20-alpine3.18
# Copy built assets from auth-service-build stage
COPY --from=auth-service-build /usr/src/app/auth-service/. /usr/src/app/auth-service
# Copy built assets from frontend-build stage
COPY --from=frontend-build /usr/src/app/frontend/dist /usr/src/app/frontend
# Copy .env from frontend-build stage
COPY --from=frontend-build /usr/src/app/frontend/.env /usr/src/app/frontend/

WORKDIR /usr/src/app

# Install serve to serve the frontend static files
RUN npm install -g serve

# Expose ports (auth-service port and frontend port)
EXPOSE 3000
EXPOSE 5000

# Run the auth-service and frontend
CMD ["sh", "-c", "node --env-file=./auth-service/.env ./auth-service/bin/www & serve -s frontend -l 5000"]
