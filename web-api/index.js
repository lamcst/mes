const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const Knex = require('knex');
const { Model } = require('objection');
const cors = require('cors')
const { Server } = require("socket.io");
const {createServer} = require('node:http');

const knexConfig = require('./knexfile');
const routes = require('./src/routes')

const app = express()
const server = createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
app.use((req, res, next) => {
  req.io = io;
  return next();
});
const port = Number(process.env.PORT || 4000)

Model.knex(Knex(knexConfig))

app.use(cors());
app.use(morgan('tiny'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('', routes);

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send({message:'something wrong'})
})

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
});

server.listen(port, () => {
  console.log(`MES web api listening on port ${port}`)
})