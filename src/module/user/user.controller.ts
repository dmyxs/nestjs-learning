import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Headers,
  Body,
  Query,
  Param,
  UsePipes,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
// import { myPipe } from '../../common/pipes/user.pipe';
import { AuthGuard } from '../../common/guard/auth.guard';
import { Roles } from '../../common/decorator/role.decorator';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  @Get()
  getUser(@Query() query) {
    return query;
  }

  @Get(':id')
  getUserById(@Param('id', new ParseIntPipe()) id) {
    console.log('user', typeof id);
    return id;
  }

  @Post()
  createUser(@Body() user, @Headers('token') token) {
    return {
      user,
      token,
    };
  }

  @Put(':id')
  // @UsePipes(new myPipe())
  updateUser(@Body() user, @Param('id') id) {
    return {
      user,
      id,
    };
  }

  @Delete(':id')
  @Roles('admin')
  removeUser(@Param('id') id) {
    return id;
  }
}
