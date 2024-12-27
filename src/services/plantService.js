import { ObjectId } from "mongodb";

export class PlantService {
    constructor(collection) {
        this.collection = collection;
    }

    async getAllPlants() {
        return await this.collection.find({}).toArray();
    }

    async createPlant(plant) {
        const result = await this.collection.insertOne(plant);
        return { ...plant, _id: result.insertedId };
    }

    async updatePlant(id, plant) {
        const result = await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: plant }
        );
        if (result.matchedCount === 0) {
            throw new Error('Plant not found');
        }
        return result;
    }

    async deletePlant(id) {
        const result = await this.collection.deleteOne({
            _id: new ObjectId(id),
        });
        if (result.deletedCount === 0) {
            throw new Error('Plant not found');
        }
        return result;
    }
}