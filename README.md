# Shopify Daily API

There is a [url.txt](src/infra/utils/urls.txt) file containing all the Shopify site URLs. After reading and accessing all the sites, this API saves the information to a Postgres database and uses a Cron Job to update it once a day.

For testing purposes, you can change the cron job's execution time from daily (0 0 * * ) to every minute ( * * * *) in the [server's initialization file](src/main/server.ts).

[**1. Architecture**](docs/architecture.md)

[**2. Routes**](docs/routes.md)

[**3. Front-end**](https://github.com/Lukenoutte/shopify-daily-app)

## Install and Run

**1. Install the dependencies. For this, you will need node ">=20.0.0".**

```bash
yarn install
```

**2. Create a ".env" file following the template of the [".env.example"](.env.example) file.**

**3. You'll need a Postgres database; create one and replace the "DATABASE_URL" variable.**

**4. Run the migrations to create the tables in the database.**

```bash
yarn migrate:up
```
**5. Run the project.**

```bash
yarn dev
```
