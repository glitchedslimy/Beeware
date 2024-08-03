import { serve } from '@hono/node-server';
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';

const app = new OpenAPIHono();

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Beeware API',
  },
});

const basicRoute = createRoute({
  method: 'get',
  path: '/basic',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            hello: z.string(),
          }),
        },
      },
      description: 'Testing files in CI process',
    },
  },
});

app.openapi(basicRoute, (c) => {
  return c.json({ hello: 'world' }, 200);
});

app.get('/ui', swaggerUI({ url: '/doc' }));

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
