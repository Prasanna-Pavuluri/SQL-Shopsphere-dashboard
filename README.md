# ShopSphere Dashboard

This is a small web dashboard for the deployed ShopSphere MySQL database.

## Environment variables

Set these on the hosting platform:

- DB_HOST = shopshere-mysql-shopspheredatabase4.j.aivencloud.com
- DB_PORT = 19108
- DB_NAME = shopshere_db
- DB_USER = avnadmin
- DB_PASSWORD = your Aiven password (do not commit it)

## Run locally

```bash
npm install
npm start
```

Then open http://localhost:3000

The server uses SSL for the Aiven MySQL connection and exposes read-only dashboard endpoints for the main ShopSphere tables.
