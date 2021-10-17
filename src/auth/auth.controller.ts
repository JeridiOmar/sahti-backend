import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up-dto';
import ConfirmEmailDto from './dto/confirmEmail.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('create')
  create(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
  @Post('confirm')
  async confirm(@Body() confirmEmailDto: ConfirmEmailDto) {
    return this.authService.confirmEmail(confirmEmailDto);
  }
}
