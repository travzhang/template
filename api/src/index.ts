import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { openAPIRouteHandler } from 'hono-openapi'
import routes from './routes/index.js'

const app = new Hono()

app.get('/', (c) => c.text('Hello Hono!'))

app.route('/', routes)

app.get(
  '/openapi.json',
  openAPIRouteHandler(routes, {
    documentation: {
      info: {
        title: 'API',
        version: '1.0.0',
        description: 'Template API',
      },
      servers: [{ url: 'http://localhost:3000', description: 'Local' }],
    },
  }),
)

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
    console.log(`OpenAPI spec: http://localhost:${info.port}/openapi.json`)
  },
)
