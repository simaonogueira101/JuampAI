FROM node:lts-alpine

WORKDIR /app
 
COPY package.json ./
COPY yarn.lock ./
COPY . .
RUN yarn install

ENV PORT 5173
EXPOSE 5173
ENTRYPOINT ["yarn"]
CMD ["dev"]
