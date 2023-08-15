import { createConnection } from 'typeorm';

export const MysqlProviders = [
  {
    provide: `DATABASE_CONNECTION`,
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'stage',
        entities: ['dist/**/**.entity.js', 'src/**/**.entity.ts'],
        logging: true,
        synchronize: true,
        dropSchema: false,
      }),
    },
];
