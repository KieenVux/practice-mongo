import { BaseRepository } from 'src/base/repository.base';
import { EntityRepository, FindManyOptions, Repository } from 'typeorm';
import { Account } from './entities/account.entity';

@EntityRepository(Account)
export class AccountRepository extends BaseRepository<Account> {}
