import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseRepository } from './repository.base';

export class BaseService<Entity, R extends BaseRepository<Entity>> {
  protected repository: R;
  constructor(repository: R) {
    this.repository = repository;
  }

  async create(item: Entity) {
    return await this.repository.createItem(item);
  }

  async getAllItem() {
    return await this.repository.findAllItem();
  }

  async getAItemByID(id: string) {
    return await this.repository.findItemByID(id);
  }

  async updateItemByID(
    id: string,
    itemToUpdate: QueryDeepPartialEntity<Entity>,
  ) {
    return await this.repository.updateItem(id, itemToUpdate);
  }

  async deleteItemById(id: string) {
    return await this.repository.deleteItem(id);
  }
}
