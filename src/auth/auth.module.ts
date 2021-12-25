import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from 'src/account/account.module';
import { AccountRepository } from 'src/account/account.respository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    JwtModule.register({
      secret: 'super-secret',
      signOptions: { expiresIn: '6000s' },
    }),
    TypeOrmModule.forFeature([AccountRepository]),
    PassportModule,
    AccountModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}
