FROM node:16-alpine as base_dependencies
RUN apk update && apk add bash git python2 make g++ yarn>=1.22.4
WORKDIR /app
COPY package.json ./
RUN yarn install 

FROM base_dependencies as builder
COPY . .
RUN yarn run build

FROM node:16-alpine as release
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeuser -u 1001
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=base_dependencies /app/package.json ./package.json
RUN yarn --production

USER nodeuser
ENV NODE_ENV production

CMD ["node", "dist/main.js"]