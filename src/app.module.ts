import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/users/user.module'; // Assurez-vous d'importer le UserModule ici
import { JwtModule } from '@nestjs/jwt';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'stage',
      entities: ['dist/**/**.entity.js'],
      synchronize: true,
    }),
    UserModule, // Ajoutez UserModule ici
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    ShopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
