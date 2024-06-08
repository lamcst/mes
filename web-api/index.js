const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const Knex = require('knex');
const { Model } = require('objection');

const knexConfig = require('./knexfile');
const routes = require('./src/routes')


const app = express()
const port = Number(process.env.PORT || 4000)

Model.knex(Knex(knexConfig))

app.use(morgan('tiny'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('', routes);


app.listen(port, () => {
  console.log(`MES web api listening on port ${port}`)
})