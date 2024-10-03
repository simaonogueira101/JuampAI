FROM node:lts-alpine
 
COPY package.json ./
COPY yarn.lock ./
COPY . .
RUN yarn install

ENV PORT 8080
EXPOSE 8080
ENTRYPOINT ["yarn"]
CMD ["start"]
