import { Hono } from 'hono'
import { env } from 'hono/adapter'
import { seedWeaviate } from '../../scripts/seed-weaviate';
import makeMagicHappen from '../prompts/Magic';

const ai = new Hono()

ai.post('/magic', async (c) => {
  const body = await c.req.parseBody();

  const { OPENAI_APIKEY } = env<{ OPENAI_APIKEY: string }>(c)
  const magic = await makeMagicHappen(OPENAI_APIKEY, "What is Talent?")
  
  return c.json(magic, 201);
});

ai.get('/seed', async (c) => {
  await seedWeaviate();
  return c.text('Weaviate seeded successfully', 200);
});

export default ai