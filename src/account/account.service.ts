import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/service.base';
import { AccountRepository } from './account.respository';
import { Account } from './entities/account.entity';
import { hashSync } from 'bcryptjs';
import { Response, ResponseObject } from 'src/shared/response.shared';

const { created } = Response;

@Injectable()
export class AccountService extends BaseService<Account, AccountRepository> {
  constructor(repository: AccountRepository) {
    super(repository);
  }

  async create(item: Account): Promise<ResponseObject<Account>> {
    Object.assign(item, { password: hashSync(item.password, 10) });
    await this.repository.save(item);
    return created(item);
  }
}
