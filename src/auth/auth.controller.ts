import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorator/public.decorator';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/login.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(protected readonly service: AuthService) {}
  @Public()
  @Post('login')
  async login(
    @Body() LoginRequest: LoginRequest,
    @Request() req: Express.Request,
  ) {
    return this.service.login(LoginRequest);
  }
}
