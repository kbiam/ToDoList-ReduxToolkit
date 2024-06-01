import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, updateTodo } from '../features/todo/todoslice';
import { useState } from 'react';

function ToDo() {
  const [todoMsg, setTodoMsg] = useState({});
  const [editableTodo, setEditableTodo] = useState([]);
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  return (
    <div className="max-w-xl mx-auto mt-10 font-mono">
      <ul className="space-y-4">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between bg-white p-2 rounded-lg border border-gray-400">
            {editableTodo.includes(todo.id) ? (
              <input
                type="text"
                value={todoMsg[todo.id]}
                onChange={(e) => setTodoMsg(prev => ({ ...prev, [todo.id]: e.target.value }))}
                className="flex-1 border border-gray-300 rounded-lg px-2 py-1 text-lg mr-4"
              />
            ) : (
              <span className="flex-1 text-lg">{todo.text}</span>
            )}

            <div className="flex space-x-2">
              <button
                onClick={() => {
                  if (editableTodo.includes(todo.id)) {
                    dispatch(updateTodo({ id: todo.id, text: todoMsg[todo.id] }));
                    setEditableTodo(editableTodo.filter(todoId => todoId !== todo.id));
                    setTodoMsg(prev => {
                      const updatedMsg = { ...prev };
                      delete updatedMsg[todo.id];
                      return updatedMsg;
                    });
                  } else {
                    setEditableTodo([...editableTodo, todo.id]);
                    setTodoMsg(prev => ({
                      ...prev,
                      [todo.id]: todo.text
                    }));
                  }
                }}
                className="bg-gray-100 text-white rounded-lg px-4 py-2 transition hover:bg-gray-50"
              >
                {editableTodo.includes(todo.id) ? '📁' : '✏️'}
              </button>
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="bg-gray-100 text-white rounded-lg px-4 py-2 transition hover:bg-gray-50"
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDo;
