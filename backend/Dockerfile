FROM node:20-alpine

WORKDIR /app

COPY ../package*.json ./

RUN npm install

COPY . ./backend

WORKDIR /app/backend

EXPOSE 5000

CMD ["npm", "run", "server"]