import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'electoral_database',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  migrationsRun: true,
  logging: true,
  logger: 'file',
  migrations: ['src/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = typeOrmConfig;
