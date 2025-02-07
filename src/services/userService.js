// import { ObjectId } from "mongodb";

// export class UserService {
//     constructor(collection) {
//         this.collection = collection;
//     }

//     async getAllUsers() {
//         const users = await this.collection.find({}).toArray();
//         return users.map(user => {
//             const { password, ...userWithoutPassword } = user;
//             return userWithoutPassword;
//         });
//     }

//     async createUser(user) {
//         // Check if email already exists
//         const existingUser = await this.collection.findOne({ email: user.email });
//         if (existingUser) {
//             throw new Error('Email already exists');
//         }

//         const result = await this.collection.insertOne(user);
//         const { password, ...userWithoutPassword } = user;
//         return { ...userWithoutPassword, _id: result.insertedId };
//     }

//     async updateUser(id, user) {
//         // If email is being updated, check if new email already exists
//         if (user.email) {
//             const existingUser = await this.collection.findOne({
//                 email: user.email,
//                 _id: { $ne: new ObjectId(id) }
//             });
//             if (existingUser) {
//                 throw new Error('Email already exists');
//             }
//         }

//         const result = await this.collection.updateOne(
//             { _id: new ObjectId(id) },
//             { $set: user }
//         );
//         if (result.matchedCount === 0) {
//             throw new Error('User not found');
//         }
//         return result;
//     }

//     async deleteUser(id) {
//         const result = await this.collection.deleteOne({
//             _id: new ObjectId(id),
//         });
//         if (result.deletedCount === 0) {
//             throw new Error('User not found');
//         }
//         return result;
//     }
// }


import { ObjectId } from "mongodb";

export class UserService {
    constructor(collection) {
        this.collection = collection;
    }

    async getAllUsers() {
        const users = await this.collection.find({}).toArray();
        return users; // Return complete user objects including passwords
    }

    async createUser(user) {
        // Check if email already exists
        const existingUser = await this.collection.findOne({ email: user.email });
        if (existingUser) {
            throw new Error('Email already exists');
        }

        // Create user object with all required fields
        const newUser = {
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role || 'user',
            contactNumber: user.contactNumber,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // Validate role
        if (!['admin', 'user'].includes(newUser.role)) {
            throw new Error('Invalid role. Must be either "admin" or "user"');
        }

        const result = await this.collection.insertOne(newUser);

        // Return the complete user object including password
        return {
            _id: result.insertedId,
            ...newUser
        };
    }

    async updateUser(id, user) {
        // If email is being updated, check if new email already exists
        if (user.email) {
            const existingUser = await this.collection.findOne({
                email: user.email,
                _id: { $ne: new ObjectId(id) }
            });
            if (existingUser) {
                throw new Error('Email already exists');
            }
        }

        // Validate role if it's being updated
        if (user.role && !['admin', 'user'].includes(user.role)) {
            throw new Error('Invalid role. Must be either "admin" or "user"');
        }

        const updateData = {
            ...user,
            updatedAt: new Date()
        };

        const result = await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            throw new Error('User not found');
        }

        // Return the complete updated user including password
        return await this.collection.findOne({ _id: new ObjectId(id) });
    }

    async deleteUser(id) {
        const result = await this.collection.deleteOne({
            _id: new ObjectId(id),
        });
        if (result.deletedCount === 0) {
            throw new Error('User not found');
        }
        return result;
    }
}