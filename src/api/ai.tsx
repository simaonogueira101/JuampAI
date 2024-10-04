import { Hono } from 'hono'
import { seedWeaviate } from '../../scripts/seed-weaviate';

const ai = new Hono()

ai.post('/', async (c) => {
  const body = await c.req.parseBody();
  return c.json(body, 201);
});

ai.get('/seed', async (c) => {
  await seedWeaviate();
  return c.text('Weaviate seeded successfully', 200);
});

export default ai