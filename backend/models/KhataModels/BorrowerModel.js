import mongoose from "mongoose";

const borrowerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique : true,
        sparse: true
    },
    username: {
        type: String,
        unique: true,
        sparse : true
    },
    amount: {
        type: Number,
        required: true,
    },
});

const BorrowerModel = mongoose.model("Borrower", borrowerSchema);

export default BorrowerModel;