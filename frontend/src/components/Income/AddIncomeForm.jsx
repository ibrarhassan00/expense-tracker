import React, { useState } from 'react'
import Input from "../inputs/Input"
import EmoiPickerPopup from '../EmoiPickerPopup';

const AddIncomeForm = ({ onAddIncome }) => {
    const [income,setIncome] = useState({
        source:"",
        amount:"",
        date:"",
        icon:"",
    })

    const handleChange = (key,value) => setIncome({...income,[key]:value});
  return (
    <div>

      <EmoiPickerPopup
      icon={income.icon}
      onSelect={(seletedIcon)=>{return handleChange("icon",seletedIcon)}}
      
      />
      <Input
      value={income.source}
      onChange={({target})=>{return handleChange("source",target.value)}}
      label="Income Source"
      placeholder="Freelance , Salary , etc"
      type="text"
      />
      <Input
      value={income.amount}
      onChange={({target})=>{return handleChange("amount",target.value)}}
      label="Amount"
      placeholder="Freelance , Salary , etc"
      type="number"
      />
      <Input
      value={income.date}
      onChange={({target})=>{return handleChange("date",target.value)}}
      label="Date"
      placeholder="Freelance , Salary , etc"
      type="date"
      />
      <div className='flex justify-end mt-6'>
<button
type='button'
className='add-btn add-btn-fill'
onClick={()=>{return onAddIncome(income)}}
>
Add Income
</button>
      </div>
    </div>
  )
}

export default AddIncomeForm
