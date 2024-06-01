import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [],

}

export const todoslice = createSlice({
    name: 'todo',
    initialState,
    reducers:{
        addTodo: (state,action) => {
            if(action.payload != ''){
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            state.todos.push(todo)
        }},
        removeTodo : (state,action)=>{
            state.todos = state.todos.filter((todo)=>todo.id!=action.payload)
        },
        updateTodo : (state,action)=>{
            const todo = state.todos.find((todo)=>todo.id === action.payload.id)
            if(todo){
                todo.text = action.payload.text
            }

        }
    }
})

export const {addTodo,removeTodo,updateTodo} = todoslice.actions
export default todoslice.reducer