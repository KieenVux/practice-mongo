import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRepository } from 'src/account/account.respository';
import { Account } from 'src/account/entities/account.entity';
import { FindOneOptions } from 'typeorm';
import { LoginRequest } from './dto/login.dto';
import { Payload } from './strategy/payload.dto';
import { compareSync } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AccountRepository)
    private readonly repository: AccountRepository,
    private readonly jwtService: JwtService,
  ) {}
  async login(LoginRequest: LoginRequest) {
    //Todo: lấy account về để kt
    const filter: FindOneOptions<Account> = {
      where: { email: LoginRequest.email },
    };
    const account = await this.repository.findOne({
      ...filter,
    });

    if (account !== undefined) {
      const payload: Payload = {
        id: account.id,
        email: account.email,
        name: account.name,
        role: account.role,
      };

      const checkedPassword = compareSync(
        LoginRequest.password,
        account.password,
      );
      if (checkedPassword) {
        return {
          token: this.jwtService.sign({ payload }),
        };
      } else {
        throw new UnauthorizedException('Credential incorrect!!!');
      }
    } else {
      throw new UnauthorizedException(`${LoginRequest.email} is not found`);
    }
  }
}
