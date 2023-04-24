FROM node:17
EXPOSE 3000

WORKDIR /api_fathom3
COPY . .
RUN npm install
RUN npx prisma generate
CMD ["npm", "start"]