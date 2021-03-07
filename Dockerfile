FROM node:14

COPY package.json package-lock.json src/

WORKDIR ./src

RUN npm ci --verbose

COPY . .

RUN npm run build

FROM build AS test

# build arg used to invalidate cache so tests will run
ARG TIMESTAMP

RUN npm run test
