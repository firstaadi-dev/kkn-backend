const Hapi = require('@hapi/hapi');
const routes = require('./app/routes');
const validate = require('./app/validation');

const init = async () => {
  require('dotenv').config();
  const server = Hapi.server({
    port: 8080,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register(require('hapi-auth-jwt2'));
  server.auth.strategy('jwt', 'jwt', {
    key: process.env.PRIVATE_KEY,
    validate,
  });
  server.auth.default('jwt');

  server.route(routes);

  await server.start();

  console.log('Server running on %s', server.info.uri);
};

init();
