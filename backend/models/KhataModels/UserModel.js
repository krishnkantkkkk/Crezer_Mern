import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    borrowers : [{
      type: mongoose.Schema.Types.ObjectId,
    }]
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;