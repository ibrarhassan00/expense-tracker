import IncomeModel from "../models/Icome.js";
import xlsx from "xlsx";

//Add income Source
export const addIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, source, amount , date} = req.body;
        if(!source || !amount || !date){
            return res.status(400).json({
                message:"All fields are required"
            })
        }
        const newIncome = new IncomeModel({
            userId,
            icon,
            source,
            amount,
            date : new Date(date)       
        });
        await newIncome.save();
        res.status(201).json(newIncome)
    } catch (error) {
        res.status(500).json({
            message:"Server error",
        })
    }
}

//Get getAllIncome Sources
export const getAllIncome  = async (req, res) => {

    const userId = req.user.id;
    try {
        const income = await IncomeModel.find({userId}).sort({date:-1})
        res.status(200).json(income)
    } catch (error) {
        res.status(500).json({
            message:"Server error",
        })
    }
}

//Delete income Source
export const deleteIncome = async (req, res) => {
    try {
        await IncomeModel.findOneAndDelete({_id:req.params.id})
        res.status(200).json({message:"Income deleted successfully"})
    } catch (error) {
        res.status(500).json({
            message:"Server error",
        })
    }
}

//Download income data as Excel
export const downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await IncomeModel.find({userId}).sort({date:-1})

        //Prepare data for Excelq
        const data = income.map(item => ({
            Source:item.source,
            Amount:item.amount,
            Date:item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, "income_data.xlsx");
        res.download("income_data.xlsx");
    } catch (error) {
        res.status(500).json({
            message:"Server error",
        })
    }} 