import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    lender:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    borrower:{
        type: mongoose.Schema.Types.ObjectId,
        required : true
    },
    amount : {
        type : Number,
        required: true
    },
    transactionType:{
        type : String, 
        required: true
    },
    memo:{
        type: String,
    }
});

const TransactionsModel = mongoose.model("Transactions", TransactionSchema);

export default TransactionsModel;
