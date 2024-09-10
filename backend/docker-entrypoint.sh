#!/bin/sh

# Generate Prisma client
yarn prisma generate

# Run migrations
yarn prisma migrate dev

# Start the application
exec yarn start:dev