import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'Título precisa ser uma string.' })
  @Length(10, 150, { message: 'Título precisa ter entre 10 a 150 caracteres.' })
  title: string;

  @IsString({ message: 'Excerto precisa ser uma string.' })
  @Length(10, 200, {
    message: 'Excerto precisa ter entre 10 e 200 caracteres.',
  })
  excerpt: string;

  @IsString({ message: 'Conteúdo precisa ser uma string.' })
  @IsNotEmpty({ message: 'Conteúdo não pode ser vazio.' })
  content: string;

  @IsOptional() //Will be required by Next.js
  @IsUrl({ require_tld: false }) //Top level domain rule blocks IPs and localhost
  coverImageUrl?: string;
}
