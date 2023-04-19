import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get JWT_SECRET(): string {
    return this.configService.get('JWT_SECRET');
  }

  get ROUNDS_OF_HASHING(): number {
    return this.configService.get('ROUNDS_OF_HASHING');
  }
}
