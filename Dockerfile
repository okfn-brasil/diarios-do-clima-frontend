FROM node:latest AS build
WORKDIR /build

COPY package.json package.json
RUN npm install --force

COPY public/ public
COPY src/ src
COPY webpack.prod.js webpack.prod.js
COPY webpack.config.js webpack.config.js
RUN npm run build

COPY nginx.conf nginx.conf

FROM docker.io/nginx:alpine
COPY --from=build /build/dist/ /usr/share/nginx/html
COPY --from=build /build/nginx.conf /etc/nginx/conf.d/default.conf
