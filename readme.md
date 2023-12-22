# Nest TypeScript Starter

[Nest](https://github.com/nestjs/nest) is a powerful TypeScript framework for building scalable and maintainable server-side applications.

## Installation

Before getting started, ensure that you have PostgreSQL installed and running. Create a `.env` file in the root of each service with the following configuration:

### For User Service

```env
PORT=9001
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_DB=your_database_name
POSTGRESS_PASSWORD=your_postgres_password
POSTGRES_PORT=5432
PRIVATE_KEY=topsecret

```

### For Product Service

```env
PORT=9002
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_DB=your_database_name
POSTGRESS_PASSWORD=your_postgres_password
POSTGRES_PORT=5432
PRIVATE_KEY=topsecret

```

### After setting up your environment variables, run:

$ npm install

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
