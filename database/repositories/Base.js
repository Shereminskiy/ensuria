export default class BaseRepository {
  findBy(item) {
    throw new Error(`Method not implemented. Item : ${item}`);
  }

  create(item) {
    throw new Error(`Method not implemented Item : ${item}`);
  }

  async update(entity, item) {
    return entity.$query().updateAndFetch(item);
  }
}
