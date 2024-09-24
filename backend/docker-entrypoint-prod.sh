#!/bin/sh

# Run Prisma generate
yarn prisma generate

# Start the application
yarn prisma migrate deploy

exec node dist/main.js