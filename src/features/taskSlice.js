import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tasks: JSON.parse(localStorage.getItem('items')) || [],
  filterTasks: false,
  assignee: {},
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { title, content, endDate, startDate, columnName, assignees, priority } = action.payload;
      const newTask = {
        id: nanoid(),
        title: title,
        content: content,
        columnName: columnName,
        startDate: startDate,
        endDate: endDate,
        assignees: assignees,
        priority: priority,
        isIssue: false
      }
      state.tasks = [...state.tasks, newTask];
      localStorage.setItem('items', JSON.stringify(state.tasks));
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.removeItem('items', JSON.stringify(state.tasks));
    },
    updateTask: (state, {payload: { id, title, content, endDate, startDate }}) => {
      state.tasks = state.tasks.map(task => task.id === id ? {...task, title, content, endDate, startDate} : task);
      localStorage.setItem('items', JSON.stringify(state.tasks));
    },
    handleFilterTasks: (state, action) => {
      state.filterTasks = !state.filterTasks;
      state.assignee = action.payload;
      localStorage.setItem('assignee', JSON.stringify(state.assignee));
    },
    handleTaskColumn: (state, action) => {
      state.tasks = state.tasks.map(task => task.id === action.payload.id ? {...task, columnName: action.payload.columnName} : task);
      localStorage.setItem('items', JSON.stringify(state.tasks));
    }
  }
});

export const { addTask, removeTask, updateTask, handleFilterTasks, handleTaskColumn } = taskSlice.actions;

export default taskSlice.reducer;