import IncomeModel from "../models/Icome.js";
import ExpenseModel from "../models/Expense.js";
import { isValidObjectId ,  Types } from "mongoose";

export const getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));
        
        //Fatch total income and expense
        const totalIncome = await IncomeModel.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
//console.log("totalIncome:", totalIncome);

        const totalExpense = await ExpenseModel.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        //Get income transaction for last 60 days
        const last60DaysIncomeTransactions = await IncomeModel.find({
            userId: userObjectId,
            date:{$gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)},
        }).sort({date:-1})

        //Get total income for last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce((sum,transaction) => sum + transaction.amount,0);

        //Get expense transaction for last 30 days
        const last30DaysExpenseTransactions = await ExpenseModel.find({
            userId: userObjectId,
            date:{$gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)},
        }).sort({date:-1})

        //Get total expense for last 30 days
        const expenseLast30Days = last30DaysExpenseTransactions.reduce((sum,transaction) => sum + transaction.amount,0);
 //Fatch last 5 transaction ( income and expense both)
        const lastTransactions = [
            ...(await IncomeModel.find({ userId: userObjectId }).sort({ date: -1 }).limit(5)).map( (txn) =>({
                ...txn.toObject(),
                type:"income"
            })),

            ...(await ExpenseModel.find({ userId: userObjectId }).sort({ date: -1 }).limit(5)).map( (txn) =>({
                ...txn.toObject(),
                type:"expense"
            }))

        ].sort((a,b) => b.date - a.date) //sort by latest frist

        //Final response
        res.json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpense:{
                total:expenseLast30Days,
                transactions:last30DaysExpenseTransactions
            },
            last60DaysIncome:{
                total:incomeLast60Days,
                transactions:last60DaysIncomeTransactions
            },
            recentTransactions:lastTransactions
        })
    }catch (error) {
        res.status(500).json({
            message:"Server error",
        })

        }}
       