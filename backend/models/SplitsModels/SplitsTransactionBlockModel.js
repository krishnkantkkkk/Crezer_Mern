import mongoose from "mongoose";

const splitsTransactionBlockSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    amount : {
        type : Number,
        required : true,
    },
});

const SplitsTransactionBlockModel = mongoose.model("SplitsTransactionBlock", splitsTransactionBlockSchema);

export default SplitsTransactionBlockModel;