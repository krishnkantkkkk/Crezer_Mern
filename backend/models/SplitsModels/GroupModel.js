import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    name: {
      type: String,
      required: true
    },
    amount:{
        type: Number,
        default : 0
    },
    members:[{
        type: mongoose.Schema.Types.ObjectId,
    }]
});

const GroupModel = mongoose.model("Group", groupSchema);

export default GroupModel;