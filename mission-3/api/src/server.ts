import fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import db from '@wirunekaewjai/mockup-ts';

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

const server = fastify({});

server.register(fastifyCors);
server.get('/questions', async () => {
  return db.map(e => ({
    id: e.id,
    title: e.question,
  }));
});

interface Schema {
  Params: {
    questionID: string;
  };
}

server.get<Schema>('/questions/:questionID', async (req) => {
  const id = req.params.questionID;
  const q = db.find(e => e.id === id);

  return {
    answer: q?.answer ?? 'ไม่พบคำตอบ',
  };
});

server.listen(port, host, async (err, address) =>
{
  if (err)
  {
    server.log.error(err.message);
    process.exit(1);
  }

  server.log.info(`server listening on ${address}`);
  console.log(server.printRoutes());
});