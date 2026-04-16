import BorrowerModel from '../models/KhataModels/BorrowerModel.js';
import UserModel from '../models/KhataModels/UserModel.js';
import TransactionsModel from '../models/KhataModels/TransactionsModel.js';

const fetchDetails = async (borrowersList)=>{
    const res = Promise.all(borrowersList.map(async (borrower) => {
            const detail = await BorrowerModel.findOne({_id : borrower});
            return detail;
        })
    );
    return res;
}

const createTransaction = async (lender, borrower, amount, transactionType, memo) => {
    const transaction = await TransactionsModel.create({
        lender,
        borrower,
        amount,
        transactionType,
        memo
    })
    return transaction;
}

export const fetchBorrowers = async (req, res) => {
    try{
        const user = await UserModel.findOne({_id : req.user.id});
        const borrowersList = user.borrowers;
        const details = await fetchDetails(borrowersList);
        return res.status(200).json({response : {
            message : "Fetched Successfully",
            borrowersList : details
        }});
    }catch(err){
        console.log(err);
        return res.status(500).json({response : {
            message : "Internal Server Error"
        }});
    }
}

export const createBorrower = async (req, res) => {
    try{
        const {name, phone, username, amount, memo} = req.body;
        const userId = req.user.id;
        const newBorrower = await BorrowerModel.create({
            name,
            phone,
            username,
            amount,
        });
        await UserModel.findByIdAndUpdate(userId, {$push: {borrowers: newBorrower._id}});
        createTransaction(req.user.id, newBorrower, amount, "Borrowed", memo);
        return res.status(201).json({response : {
            message : "Borrower Created Successfully",
            borrowerDetail : newBorrower
        }});
    }catch(err){
        console.log(err);
        return res.status(500).json({response : {
            message : "Internal Server Error"
        }});
    }
}

export const fetchTransactions = async (req, res) =>{
    try{
        const lender = req.user.id;
        const borrower = req.params.borrowerId;
        const transactions = await TransactionsModel.find({lender, borrower});
        return res.status(200).json({response : {
            message : 'Fetched Sucessfully',
            transactions
        }});
    }catch(err){
        console.log(err);
        return res.status(500).json({response : {
            message : "Internal Server Error"
        }})
    }
}

export const makeTransaction = async (req, res)=>{
    try{
        const {amount, transactionType, borrower, memo} = req.body;
        if(amount <= 0) return res.status(400).json({response : {
            message : 'Enter a valid amount'
        }})
        if(transactionType === 'Borrowed'){
            await BorrowerModel.findOneAndUpdate({_id : borrower}, {$inc: {amount : amount}});
            const updatedBorrowerDetail = await BorrowerModel.findOne({_id : borrower});
            createTransaction(req.user.id, borrower, amount, transactionType, memo);
            return res.status(201).json({response : {
                message : "Transaction made successfully",
                updatedBorrowerDetail
            }});
        }
        else if(transactionType === 'Paid'){
            const user = await BorrowerModel.findOne({_id : borrower});
            if(user.amount - amount >= 0){
                await BorrowerModel.findOneAndUpdate({_id : borrower}, {$inc: {amount : -amount}});
                const updatedBorrowerDetail = await BorrowerModel.findOne({_id : borrower});
                createTransaction(req.user.id, borrower, amount, transactionType, memo);
                return res.status(201).json({response : {
                    message : "Transaction made successfully",
                    updatedBorrowerDetail
                }});
            }else{
                return res.status(400).json({response : {
                    message : "Final Amount cannot be negative."
                }})
            }
        }
        else {
            return res.json({response : {
                message : 'Invalid Transaction Type! Can be only "Borrowed", "Paid".'
            }});
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({response:{
            message : "Internal Server Error"
        }})
    }
}
