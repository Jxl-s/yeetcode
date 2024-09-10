#!/bin/sh

# Generate Prisma client
yarn prisma generate
yarn prisma migrate dev

exec yarn start:dev