const express = require('express')
const prom = require('prom-client')
const app = express()
const counter = new prom.Counter({
  name: 'request_increment',
  help: 'Counter Requests',
  labelNames:['statusCode']
});

const gauge = new prom.Gauge({
  name: 'bytes_test',
  help: 'Bytes in page'
})

const historigram = new prom.Histogram({
  name:'aula_request_time_seconds',
  help:'Tempo de resposta da API',
  buckets:[0.1, 0.2, 0.3, 0.4, 0.5]
})

app.get('/', function(req,res){
  counter.inc()
  gauge.set(Math.random())
  historigram.observe(Math.random())
  counter.labels('200').inc()
  res.send('work')
})

app.get('/metrics', async function(req,res){
  res.set('Content-Type', prom.register.contentType)
  res.end(await prom.register.metrics())
})

app.listen(3000)