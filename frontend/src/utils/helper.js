import moment from "moment";

export const validateEmail = (email) =>{
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email)
}


 export const getInitials = (name) => {
    if (!name) return "";
    const words = name.split(" ")    
    let initials = "";

    for (let i = 0; i < words.length; i++) {
        if (words[i].length > 0 && initials.length < 2) {
            initials += words[i][0];
        }
    
    
  }
return initials.substring(0, 2).toUpperCase();

}

  export const addThousandSeparator = (num) => {
    if (num === undefined || num === null) return "";
    
    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger; 
  }

  export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    name: item?.category,
    category: item?.category,
    amount: item?.amount,
  }));

  return chartData;
};

export const prepareIncomeBarChartData = (data=[]) =>{
const sortedDate = [...data].sort((a,b)=>{
  return new Date(a.date) - new Date(b.date)
})

const chartData = sortedDate.map((item)=>{
  return {
    month:moment(item?.date).format("MM Do"),
    amount: item?.amount,
    source: item?.source
  }  
})
return chartData
}