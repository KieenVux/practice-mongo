import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { BaseInfo } from 'src/base/entity.base';
import { Column, Entity } from 'typeorm';

export enum Role {
  ADMIN = 'admin',
  MANAGER = 'manager',
  MEMBER = 'member',
}

@Entity('account')
export class Account extends BaseInfo {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column()
  address: string;

  @ApiProperty()
  @Column()
  phone: string;

  @ApiProperty()
  @Column()
  email: string;

  @Column({ type: 'enum', enum: Role, default: Role.MEMBER })
  role: string;
}

export class UpdateAccountDTO extends PartialType(Account) {}
