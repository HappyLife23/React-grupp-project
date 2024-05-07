import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    columns: JSON.parse(localStorage.getItem('columns')) || [],
    column: null
}

const columnSlice = createSlice({
    name: 'column',
    initialState,
    reducers: {
        newColumnHandler: (state, action) => {
            const columnName = action.payload;
            let isUsed = state.columns.some(column => column.title.toUpperCase() === columnName.toUpperCase());
            if (isUsed || columnName.toUpperCase() === 'DONE') {
                alert('Board has already been created')
            } else {
                const column = {
                    title: columnName,
                    id: nanoid(),
                }
                state.columns.push(column);
                localStorage.setItem('columns', JSON.stringify(state.columns));
            }
        },
        deleteColumnHandler: (state, action) => {
            const updatedColumns = state.columns.filter(column => column.id != action.payload);
            state.columns == updatedColumns;
            localStorage.setItem('columns', JSON.stringify(updatedColumns));
        },
        columnDisplayHandler: (state, action) => {
            state.column = action.payload;
        },
        updateColumnName: (state, action) => {
            const {id, title} = action.payload;
            let isUsed = state.columns.some(column => column.title.toUpperCase() === title.toUpperCase());
            if (isUsed || title.toUpperCase() === 'DONE') {
                alert(`${title} column allready exists`);
            } else {
                const updatedColumns = state.columns.map(column => (
                    column.id === id ? {...column, title: action.payload.title } : column
                ));
                state.columns = updatedColumns;
                localStorage.setItem('columns', JSON.stringify(state.columns));
            }
        }
    }
});

export const { newColumnHandler, deleteColumnHandler, columnDisplayHandler, updateColumnName } = columnSlice.actions;

export default columnSlice.reducer;