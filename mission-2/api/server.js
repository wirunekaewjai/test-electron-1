const fastify = require('fastify');
const fastifyCors = require('fastify-cors');
const db = require('@wirunekaewjai/mockup');

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

server.get('/questions/:questionID', async (req) => {
  const id = req.params.questionID;
  const q = db.find(e => e.id === id);

  return {
    answer: q.answer,
  };
});

server.listen(port, host, async (err, address) => {
  if (err)
  {
    server.log.error(err.message);
    process.exit(1);
  }

  server.log.info(`server listening on ${address}`);
  console.log(server.printRoutes());
});