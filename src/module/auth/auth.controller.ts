import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
// // import { InjectModel } from 'nestjs-typegoose';
// import { ReturnModelType } from '@typegoose/typegoose';

export class RegisterDto {
  username: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  // constructor(
  //   @InjectModel(User) private userModel: ReturnModelType<typeof User>,
  // ) { }

  @Post('register')
  async register(@Body() user: RegisterDto) {
    // const { username, password } = user;
    // await this.userModel.create({
    //   username,
    //   password,
    // });

    if (Object.keys(user).length < 1) {
      // throw new HttpException('数据不能为空', HttpStatus.BAD_REQUEST);
      throw new BadRequestException();
    }
    return user;
  }

  @Post('login')
  async login(@Body() user) {
    return user;
  }
}
