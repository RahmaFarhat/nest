import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // Définissez les méthodes spécifiques du UserRepository ici si nécessaire
}
