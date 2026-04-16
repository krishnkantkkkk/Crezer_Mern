import express from 'express';
const router = express.Router();
import { createBorrower, fetchBorrowers, fetchTransactions, makeTransaction } from '../controllers/BorrowerController.js';

router.get('/', (req, res) => {
    res.send('Borrower route is working');
});

router.post('/createBorrower', createBorrower);
router.get('/fetchBorrowers', fetchBorrowers);
router.get('/fetchTransactions/:borrowerId', fetchTransactions);
router.post('/makeTransaction', makeTransaction);

export default router;