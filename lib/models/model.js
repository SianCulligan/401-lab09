'use strict';

class Model {
  constructor(schema) { 
    this.schema = schema;
  }

  //read all results
  async getAllResults(query) {
    let results = await this.schema.find(query);
    return results;
  }
  //read by ID
  async getById(_id) {
    let record = await this.schema.findOne({ _id });
    return record;
  }
  //create
  async create(newEntry) {
    let object = await this.schema.create(newEntry);
    return object;
  }
  //update 
  async update(_id, newDetails) {
    // let entryToUpdate = await this.schema.findOne({ _id });
    // let update = await entryToUpdate.schema.update(newDetails);
    await this.schema.updateOne({_id}, newDetails);
    let update =  await this.schema.read(_id);
    return update;
  }
  //delete
  async delete(_id) {
    let deletedEntry = await this.schema.deleteOne({ _id });
    return deletedEntry;
  }
}

module.exports = Model;
