import { useEffect ,useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPath";

export const useUserAuth = () => {

  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;
    let isMounted = true;

    const fatchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
        if (isMounted) {
          updateUser(response.data);
        }
      } catch (error) {
        console.log("Error fetching user info:", error);
        if (isMounted) {
          clearUser();
          navigate("/login");
        }
      }
    };

fatchUserInfo();
return () => {
    isMounted = false;
  };

  },[user, updateUser, clearUser]);

  
return { user };
  };

