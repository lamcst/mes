Recomended setup
- Mac OS
- Node v18
- Docker desktop

Setup database
- At root folder
- Run cd ./web-api-migration
- Create .env based on .env.example
- Run npm run docker:db
- Run npm run migrate:latest
- Run npm run seed:run

Run on web-api
- run docker compose build
- run docker compose up