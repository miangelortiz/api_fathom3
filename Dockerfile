FROM node:17
EXPOSE 3000

WORKDIR /api_fastify_prisma
COPY . .
RUN npm install
RUN npx prisma generate
CMD ["npm", "start"]