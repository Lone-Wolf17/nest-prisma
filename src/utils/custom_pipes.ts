import { BadRequestException, ParseUUIDPipe } from '@nestjs/common';

export const ParseIDPipe = new ParseUUIDPipe({
  exceptionFactory(_) {
    return new BadRequestException('id must be a uuid');
  },
});
