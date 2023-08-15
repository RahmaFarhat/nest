import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository'; // Assurez-vous d'importer le UserRepository ici
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRepository]), // Ajoutez UserRepository ici
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UserModule {}
