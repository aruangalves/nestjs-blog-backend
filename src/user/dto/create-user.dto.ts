import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Nome de usuário precisa ser uma string' })
  @IsNotEmpty({ message: 'Nome de usuário não pode estar vazio' })
  name: string;
  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'E-mail não pode estar vazio' })
  email: string;
  @IsString({ message: 'Senha precisa ser uma string' })
  @IsNotEmpty({ message: 'Senha não pode estar vazia' })
  @MinLength(6, { message: 'Senha deve conter um mínimo de seis caracteres' })
  password: string;
}
