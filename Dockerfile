FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 5000

CMD ["sh", "-c", "npx prisma db push && npx prisma db seed && npm run start"]

# CMD ["npm", "run", "start"]
