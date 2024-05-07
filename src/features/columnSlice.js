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
            console.log(action.payload)
            const updatedColumns = state.columns.filter(column => column.id != action.payload);
            state.columns == updatedColumns;
            localStorage.setItem('columns', JSON.stringify(state.columns));
        },
        columnDisplayHandler: (state, action) => {
            state.column = action.payload;
        },
        updateColumnName: (state, action) => {
            const { prevColumnName, newColumnName } = action.payload;
            let isUsed = state.columns.some(column => column.toUpperCase() === newColumnName.toUpperCase());
            if (isUsed || newColumnName.toUpperCase() === 'DONE') {
                alert(`${newColumnName} column allready exists`);
            } else {
                state.columns = state.columns.map(column => (
                    column === prevColumnName ? newColumnName : column
                ))
            }
            localStorage.setItem('columns', JSON.stringify(state.columns));
        }
    }
});

export const { newColumnHandler, deleteColumnHandler, columnDisplayHandler, updateColumnName } = columnSlice.actions;

export default columnSlice.reducer;