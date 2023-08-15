import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request, request } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get('email/:email')
  async getUserByEmail(
    @Param('email') email: string,
  ): Promise<User | undefined> {
    return this.usersService.findUserByEmail(email);
  }


  
  @Post('login')
  async login(@Body() userData: { email: string; password: string }) {
    const { email, password } = userData;

    // Rechercher l'utilisateur dans la base de données par son email
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new HttpException('Utilisateur non trouvé', HttpStatus.NOT_FOUND);
    }

    // Comparer le mot de passe fourni avec le mot de passe haché dans la base de données
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new HttpException(
        'Mot de passe incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Ici, vous pouvez générer un jeton JWT (JSON Web Token) pour l'utilisateur authentifié
    // et le renvoyer comme réponse.

    // Exemple (en utilisant le module JwtModule que vous avez déjà configuré):
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    // Vous pouvez renvoyer le jeton d'accès à l'utilisateur, ou toute autre donnée souhaitée.
    return { accessToken, user };
  }

  @Get('user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.usersService.findOne1({ id: data['id'] });

      const { password, ...result } = user;

      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
  // private isPasswordValid(password: string): boolean {
  //   // Définir les critères de validation du mot de passe
  //   // Par exemple, le mot de passe doit avoir au moins 8 caractères et inclure au moins un chiffre et un caractère spécial
  //   const passwordRegex =
  //   /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  
  //   return passwordRegex.test(password);
  // }

  @Post('register')
  async register(@Body() userData: { email: string; password: string }) {
    const { email, password } = userData;
    // if (!this.isPasswordValid(password)) {
    //   throw new BadRequestException(
    //     'Le mot de passe ne satisfait pas aux critères.',
    //   );
    // }
    const existingUser = await this.usersService.findUserByEmail(email);
    if (existingUser) {
      // L'email est déjà enregistré dans la base de données, renvoyer une exception BadRequestException
      throw new BadRequestException('Cet email est déjà utilisé');
    }
    const saltRounds = 10;

    // Générer le sel
    const salt = await bcrypt.genSalt(saltRounds);

    // Hacher le mot de passe avec le sel
    const hashedPassword = await bcrypt.hash(password, salt);

    // Sauvegarder l'utilisateur avec le mot de passe haché dans la base de données
    const user = await this.usersService.create({
      email,
      password: hashedPassword,
    });

    return user;
  }
}
