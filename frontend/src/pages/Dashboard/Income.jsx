import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPath";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import toast from "react-hot-toast";
import IncomeList from "../../components/Income/IncomeList";

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  //Get Income Details
  const fatchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`,
      );
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again", error);
    } finally {
      setLoading(false);
    }
  };

  //Handle Add Income
  const handleAddIncome = async (income) => {
    const {source,amount,date,icon} = income
    //Validation Checks
    if(!source.trim()){
      toast.error("Source is required")
      return
    }
    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Amount Should be a valid number than 0")
      return
    }
    if(!date){
toast.error("Date is requried")
return
    }
    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME,{
        source,
        amount,
        date,
        icon,
      })
      setOpenAddIncomeModel(false)
      toast.success("Income added successfully")
      fatchIncomeDetails()
    } catch (error) {
      console.log("Error Adding Income",error?.response?.data?.message || error.message);
      
    }
  };

  //Delete Income
  const deleteIncome = async () => {};

  //Handle Download details
  const handleDownloadIncomeDetails = async () => {};

  useEffect(()=>{
fatchIncomeDetails()
    return ()=>{}
  },[])


  return (
    <DashboardLayout activeMenu={"Income"}>
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => {
                return setOpenAddIncomeModel(true);
              }}
            />
          </div>
          <IncomeList 
          transactions={incomeData}
          onDelete={(id)=>{
            setOpenDeleteAlert({show:true,data:id})
          }}
          onDownload={handleDownloadIncomeDetails}
          />
        </div>
        <Modal
         isOpen={openAddIncomeModel} 
         onClose={()=>{return setOpenAddIncomeModel(false)}}
         title="Add Income"
         >
         <div>
          <AddIncomeForm onAddIncome={handleAddIncome} />
         </div>
         </Modal>
         
      </div>
    </DashboardLayout>
  );
};

export default Income;
