const dotenv = require('dotenv'); // eslint-disable-line
const { existsSync, readFileSync } = require('fs'); // eslint-disable-line

let config = {};

const configFile = `${process.env.NODE_ENV || '.development'}.env`;

const envFileExists = existsSync(configFile);
if (envFileExists) {
  config = dotenv.parse(readFileSync(configFile));
}
config = { ...config, ...process.env };

module.exports = {
  type: 'postgres',
  url: config.DATABASE_URL,
  logging: false,
  entities: ['**/*.entity.ts'],
  migrations: ['migrations/**/*.ts'],
  subscribers: ['subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'migrations',
    subscribersDir: 'subscribers',
  },
  seeds: ['seeds/**/*.seed.ts'],
  factories: ['factories/**/*.factory.ts'],
};
