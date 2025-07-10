import axios from "axios";

async function CreateTodo(title,description){
    try {
        const response = await axios.post("http://localhost:3000/tasks",
            {
                title,description
            }
        );
        console.log("Succcess")
    } catch (error) {
        console.log("Error creating Task")
    }

}

export default CreateTodo;