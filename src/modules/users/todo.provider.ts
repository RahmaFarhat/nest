import { Connection } from 'typeorm';
import { User } from './user.entity';

export const TodoProviders = [
  {
    provide: 'TODO_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(User),
    inject: ['DATABASE_CONNECTION'],
  },
];
