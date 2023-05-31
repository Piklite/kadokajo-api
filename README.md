## Description

Une superbe proposition d'API d'application pour que les cageots arretent de galérer pour s'offrir du sel à Noël.

## Installation

- Create a .env at the root of the project
- Configure the .env variables at your liking according to the .exemple.env

```bash
$ npm install

# Initiate the database
$ npx prisma migrate dev

# Seeding the database
$ npx prisma db seed
```

## Database

A docker-compose file is at your disposale and will use the configuration provided in the .env file. You could also create your database manually.

```bash
$ docker compose up -d
```

To initiate your DB you will have to use the prisma migrate command. You also have the possibility to seed your DB with mock data.

```bash
# Initiate the database
$ npx prisma migrate dev

# Seeding the database (Optional)
$ npx prisma db seed
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Swagger

You can access the Swagger documentation by running the app and go to "localhost:{$API_PORT}/api"

## Test

```bash
# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:e2e:cov
```
