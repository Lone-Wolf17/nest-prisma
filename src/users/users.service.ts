import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ApiConfigService } from 'src/api-config/api-config.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private configService: ApiConfigService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      this.configService.ROUNDS_OF_HASHING,
    );

    createUserDto.password = hashedPassword;
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        this.configService.ROUNDS_OF_HASHING,
      );
    }
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
