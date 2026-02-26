import ExpenseModel from "../models/Expense.js";
import xlsx from "xlsx";

//Add expense Source
export const addExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, category, amount, date } = req.body;
        if(!category || !amount || !date){

            return res.status(400).json({
                message:"All fields are required"
            })
        }
        const newExpense = new ExpenseModel({
            userId,
            icon,
            category,
            amount,
            date : new Date(date)       
        });
        await newExpense.save();
        res.status(201).json(newExpense)
    } catch (error) {
        res.status(500).json({
            message:"Server error",
        })
    }
}

//Get getAllExpense Sources
export const getAllExpense  = async (req, res) => {

    const userId = req.user.id;
    try {
        const expenses = await ExpenseModel.find({userId}).sort({date:-1})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({
            message:"Server error",
        })
    }
}

//Delete expense Source
export const deleteExpense = async (req, res) => {
    try {
        await ExpenseModel.findOneAndDelete({_id:req.params.id})
        res.status(200).json({message:"Expense deleted successfully"})
    } catch (error) {
        res.status(500).json({
            message:"Server error",
        })
    }
}

//Download expense data as Excel
export const downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const expenses = await ExpenseModel.find({userId}).sort({date:-1})

        //Prepare data for Excelq
        const data = expenses.map(item => ({
            Category:item.category,
            Amount:item.amount,
            Date:item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, "expense_data.xlsx");
        res.download("expense _data.xlsx");
    } catch (error) {
        res.status(500).json({
            message:"Server error",
        })
    }} 