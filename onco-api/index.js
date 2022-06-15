const { ChartJSNodeCanvas } = require('chartjs-node-canvas')
const fastify = require('fastify')
const chartConfig = require('../database.js')

const app = fastify()
const cjs = new ChartJSNodeCanvas({ width: 600, height: 600, backgroundColour: 'white' })

const mimeType = 'image/png'

app.get('/api/download-chart/122', async (req, reply) => {
  const buffer = await cjs.renderToBuffer(chartConfig, mimeType)
  reply.type(mimeType)
  reply.send(buffer)
})

app.get('/api/chart-config/122', async (req, reply) => {
  return chartConfig.data
})

app.listen({ port: 8000 }).then(() => {
  console.log('onco-api running at http://localhost:8000/')
})
