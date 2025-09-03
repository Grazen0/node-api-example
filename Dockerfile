FROM node:20
WORKDIR /usr/src/app

RUN corepack enable pnpm
COPY package.json pnpm-*.json ./
RUN pnpm install
COPY . .
RUN pnpm run build

EXPOSE 3000
CMD ["node", "dist/main"]

