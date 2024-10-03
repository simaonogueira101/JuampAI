FROM node:lts-alpine
 
COPY package.json ./
COPY yarn.lock ./
COPY . .
RUN yarn install

ENV PORT 3010
EXPOSE 3010
ENTRYPOINT ["yarn"]
CMD ["start"]
