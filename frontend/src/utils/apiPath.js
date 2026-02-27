export const BASE_URL = "https://expense-tracker-backend-ten-liard.vercel.app/";

//http://localhost:8000

//

//utils/apiPath.js
export const API_PATHS = {
    AUTH:{
    REGISTER: "/api/v1/auth/register",
    LOGIN: "/api/v1/auth/login",
    GET_USER_INFO: "/api/v1/auth/getuser",
    
    },
    DASHBOARD:{
        GET_DATA:"/api/v1/dashboard/"
    },
    INCOME:{    
        ADD_INCOME: "/api/v1/income/add",
        GET_ALL_INCOME: "/api/v1/income/get",
        DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
        DOWNLOAD_INCOME:"/api/v1/income/downloadexcel",

    },
    EXPENSE:{
        ADD_EXPENSE: "/api/v1/expense/add",
        GET_ALL_EXPENSE: "/api/v1/expense/get", 
        DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
        DOWNLOAD_EXPENSE:"/api/v1/expense/downloadexcel",
    },
    IMAGE:{
        UPLOAD_IMAGE:"/api/v1/auth/upload-image"
    } 
}