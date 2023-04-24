## dependencies
npm i @prisma/client fastify fastify-zod zod zod-to-json-schema @fastify/jwt

## devDependencies
npm i ts-node-dev typescript @types/node --dev

## Initialise prisma
npx prisma init --datasource-provider postgresql

## Migrate the schema
npx prisma migrate dev --name init