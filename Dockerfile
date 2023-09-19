FROM docker.io/node:14.17.0 AS install
WORKDIR /build
COPY public/ public
COPY src/ src
COPY webpack.dev.js webpack.dev.js
COPY webpack.config.js webpack.config.js
COPY package-lock.json package-lock.json
COPY package.json package.json
RUN npm ci

FROM install AS build
COPY webpack.prod.js webpack.prod.js
COPY nginx.conf nginx.conf
RUN npm run build

FROM docker.io/nginx:1.25-alpine AS nginx
COPY --from=build /build/dist/ /usr/share/nginx/html
COPY --from=build /build/nginx.conf /etc/nginx/conf.d/default.conf
