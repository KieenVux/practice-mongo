import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'src/shared/response.shared';
import { EntityRepository, FindManyOptions, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

const { created, ok } = Response;
@EntityRepository()
export class BaseRepository<Entity> extends Repository<Entity> {
  createItem(item: Entity) {
    try {
      const newItem = this.create(item);
      this.save(newItem);
      return created(newItem);
    } catch {
      throw new InternalServerErrorException(' Create Fail');
    }
  }

  async findAllItem(filter?: FindManyOptions<Entity>) {
    const data = await this.find(filter);
    if (data == undefined || data == null) {
      return new NotFoundException("Item doesn't have already");
    }
    return ok(data);
  }

  async findItemByID(id: string) {
    const item = await this.findOne(id);
    if (!item) {
      throw new NotFoundException('', "Don't have this id");
    }
    return ok(item);
  }

  async updateItem(id: string, itemToUpdate: QueryDeepPartialEntity<Entity>) {
    const data = this.update(id, itemToUpdate);
    return ok(data);
  }

  async deleteItem(id: string) {
    const check = await this.softDelete(id);
    if (check.affected == 0) {
      throw new NotFoundException('Not Found Item To Delete');
    }
  }
}
