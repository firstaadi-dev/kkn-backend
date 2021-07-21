const Hapi = require('@hapi/hapi');
const {userModel} = require('./app/models');
const routes = require('./app/routes');

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
  const validate = async function (decoded, request, h) {
    console.log(decoded);
    const isValid = await userModel.findById(decoded.user_id);
    console.log(isValid);
    if (isValid) {
      return {isValid: true};
    } else {
      return {isValid: false};
    }
  };

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
