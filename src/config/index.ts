import { defaultTo } from '@meltwater/phi';

export default () => ({
  application: {
    name: defaultTo('Learn NestJS', process.env.NAME),
    node_env: defaultTo('development', process.env.NODE_ENV),
    port: process.env.PORT || 5000,
  },
  database: {
    mongodb: {
      uri: defaultTo(
        'mongodb+srv://domey:Akankobateng1@cluster0.ymxrx.mongodb.net/vet-system',
        process.env.MONGODB_DATABASE_URI,
      ),
      useUnifiedTopology: defaultTo(
        true,
        process.env.MONGODB_USE_UNIFIED_TOPOLOGY,
      ),
      useNewUrlParser: defaultTo(true, process.env.MONGODB_USE_NEW_URL_PARSER),
      useCreateIndex: defaultTo(true, process.env.MONGODB_USE_CREATE_INDEX),
    },
    redis: {
      uri: process.env.REDISTOGO_URL,
    },
  },
  authentication: {
    jwt: {
      secretKey: defaultTo(
        '90jw98hnw9uehnfiuhgwu9hg9u',
        process.env.JWT_SECRET_KEY,
      ),
      expirationTime: defaultTo('2 days', process.env.JWT_EXPIRATION_TIME),
    },
  },
  mailgun: {
    domain: process.env.MAILGUN_DOMAIN,
    apiKey: process.env.MAILGUN_API_KEY,
    sender: process.env.MAILGUN_EMAIL_SENDER,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
    environment: defaultTo('production', process.env.SENTRY_ENVIRONMENT),
  },
});
