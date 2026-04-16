import mongoose from 'mongoose';

const splitsTransactionsSchema = new mongoose.Schema({
    transactionBlock : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    amount : {
        type : Number, 
        required : true,
    },
    paidFor:[{
        type: mongoose.Schema.Types.ObjectId,
        required : true,
    }]
});

const SplitsTransactionsModel = mongoose.model("SplitsTransaction", splitsTransactionsSchema);

export default SplitsTransactionsModel;