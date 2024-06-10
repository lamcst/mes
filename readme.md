Recomended setup
- Mac OS
- Node v18
- Docker desktop
- vs code

Setup database
- At root folder
- Run cd ./web-api
- Create .env based on .env.example
- Run npm run docker:db
- Run npm run migrate:latest

Add intial data (Warn!!!! do not run if you need the data, for example: production)
- Run npx knex seed:run

Debug on web-api
- Run npm run debug

Debug on web-app
- At root folder
- Run cd ./web-app
- Create .env based on .env.example
- Run npm run dev

Run web-api on docker via compose.yaml
- Run npm run docker:all
