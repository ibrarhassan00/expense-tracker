import { API_PATHS } from "./apiPath";
import axiosInstance from "./axiosinstance";

const uploadImage = async (imageFile) => {

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData,)
        return response.data;
    } catch (error) {
        console.log("Erroe uploading image:", error);
        throw error;
    }
}

export default uploadImage;

// {
//         headers:{
//            "Content-Type":"multipart/form-data"
//         }
//         }