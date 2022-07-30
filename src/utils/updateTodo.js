import axios from "axios";
import { baseURI } from "../constants/constants";

const updateTodo= async(newTodo)=>{
    const todoData = JSON.stringify({
        "title": newTodo.title,
        "body": newTodo.body,
        "completed": newTodo.completed,
      });

     const config = {
        method: 'patch',
        url: baseURI+'/todo/'+newTodo.id,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : todoData,
      };

    const {data} =await axios(config);
    return data;
}

export default updateTodo;