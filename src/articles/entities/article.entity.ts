import { ApiProperty } from '@nestjs/swagger';
import { Article } from '@prisma/client';
export class ArticleEntity implements Article {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  body: string;

  @ApiProperty()
  published: boolean;

  @ApiProperty({ required: false, nullable: true })
  authorId: string | null;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
