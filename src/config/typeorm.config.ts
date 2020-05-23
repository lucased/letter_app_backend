import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const config = require('config');
const dbconfig = config.get('db');

const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbconfig.type,
  host: process.env.RDS_HOSTNAME || dbconfig.host,
  port: process.env.RDS_PORT || dbconfig.port,
  username: process.env.RDS_USERNAME || dbconfig.username,
  password: process.env.RDS_PASSWORD || dbconfig.password,
  database: process.env.RDS_DB_NAME || dbconfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: process.env.TYPEORM_SYNC || dbconfig.synchronize,
  migrationsRun: true,
  logging: true,
  logger: 'file',
  migrations: ['dist/src/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = typeOrmConfig;
