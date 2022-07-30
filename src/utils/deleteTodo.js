import axios from "axios";
import { baseURI } from "../constants/constants"

const deleteTodo = async(id)=> {
    const config = {
        method : "delete",
        url : baseURI + `/todo/${id}`,
        headers : {} 
    };

    const {data} = await axios(config);
    return data.todoId;
}

export default deleteTodo;