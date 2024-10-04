import { Hono } from 'hono'

const ai = new Hono()

ai.post('/', async (c) => {
  const body = await c.req.parseBody();
  return c.json(body, 201);
})

export default ai