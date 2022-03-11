# weather
# Weather
*** not completed ***

Displays city weather

Tech used:<br />
    1. NodeJs<br />
    2. ApolloServer<br />
    3. ReactJs<br />
    4. ApolloClient<br />
    5. GraphQl<br />
    6. PostgresSQL<br />
    8. Prisma<br />

## Functionality

You can add city by name and remove city

## Local setup

Make new PSQL db for application

### SERVER

cd into server

make .env file into server root folder
example .env file

DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"<br />
API_KEY='your API key from https://openweathermap.org/'<br />
PORT=4000<br />

then:

```
npm install
npm run migrate
npm start
```

Now your server is running! And migrate file contains demo items data but not users!

### CLIENT

new terminal
cd into client folder

```
npm install
npm start
```

that should be it and your app is running

## DB Creation and Migrations

If you modify prisma schema then you need to run:

```
npx prisma migrate dev --name nameYourMigration
```
