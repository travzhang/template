import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { z } from 'zod'

const routes = new Hono()

const helloQuerySchema = z.object({
  name: z.string().optional(),
})

routes.get(
  '/hello',
  describeRoute({
    tags: ['Greeting'],
    description: 'Say hello',
    responses: {
      200: {
        description: 'Plain text greeting',
        content: {
          'text/plain': {
            schema: resolver(z.string()),
          },
        },
      },
    },
  }),
  validator('query', helloQuerySchema),
  (c) => {
    const query = c.req.valid('query')
    return c.text(`Hello ${query.name ?? 'Hono'}!`)
  },
)

const userParamsSchema = z.object({
  id: z.string().min(1),
})

const userSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    age: z.number().int(),
  })
  .meta({ ref: 'User' })

routes.get(
  '/users/:id',
  describeRoute({
    tags: ['Users'],
    description: 'Get user by id',
    responses: {
      200: {
        description: 'User record',
        content: {
          'application/json': {
            schema: resolver(userSchema),
          },
        },
      },
    },
  }),
  validator('param', userParamsSchema),
  (c) => {
    const { id } = c.req.valid('param')
    return c.json({ id, name: 'Ultra-man', age: 20 })
  },
)

export default routes
