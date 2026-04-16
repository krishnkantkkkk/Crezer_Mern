import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    amount:{
        type: Number,
        default : 0
    }
});

const MemberModel = mongoose.model("Member", memberSchema);

export default MemberModel;