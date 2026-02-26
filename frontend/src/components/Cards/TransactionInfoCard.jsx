import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
  
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  item,
  date,
  amount,
  type,
  hideDeleteBtn,
  icon,
  onDelete,
}) => {
     const getAmountStyles =()=>{
        return type === "income" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
     }
  return (
    <div className="group relative flex items-center gap-4 mt-2 p-4 rounded-lg hover:bg-grey-100/60 ">
      <div className="w-12 h-12 flex items-center justify-center bg-gray-200/50 rounded-full text-xl text-gray-800">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : (
          <LuUtensils />
        )}
      </div>
      <div className="flex-1 flex items-center justify-between">
      <div className="">
        <p className="text-sm text-gray-500 font-medium ">{title}</p>
        <p className="text-xl text-gray-400 mt-1">{date}</p>
      </div>  
      </div>

      <div className="flex items-center gap-2">
       {hideDeleteBtn && (
        <button className="text-gray-400 hover:text-red-500 opecity-0 group-hover:opacity-100 transition cursor-pointer"
        onClick={onDelete}>
            <LuTrash2 size={18} />
        </button>
       )}
      </div>
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
        <h6 className='text-xs font-medium'>
            {type === "income" ? "+" : "-"}${amount}
        </h6>
        {type == "income"  ? <LuTrendingUp /> : <LuTrendingDown />}
      </div>
    </div>
  );
};

export default TransactionInfoCard;
