import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthEntity } from './entity/auth.entity';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    // Step 1: Fetch a user with the given email
    const user = await this.prisma.user.findUnique({ where: { email } });

    // if no user found throw error
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    // Step 2: Check if the password id correct
    const isPasswordValid = user.password === password;

    // if password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException(`Invalid Password`);
    }

    // Step 3: Generate a JWT containing the user's ID and return it

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
