import { useState } from "react";
import propTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { deleteColumnHandler, updateColumnName } from "../../features/columnSlice";
import Task from "./Task";

const Column = ({ column, tasks,  handleMouseDown }) => {
    const [deleteColumn, setDeleteColumn] = useState(false);
    const [editableColumnTitle, setEditableColumnTitle] = useState(null);
    const dispatch = useDispatch();
    // Stored style by settings
    const style = useSelector(state => state.settings.tasks);
    
    const padding = style.padding;
    const gap = style.gap;
    const radius = style.radius;
    const borderSize = style.borderSize;
    const borderColor = style.borderColor;
    const taskColor = style.taskColor;
    // Columns stored styles from settings
    const boardStyle = useSelector(state => state.settings.boards);
    const boardBorderColor = boardStyle.borderColor;
    const boardBorderSize = boardStyle.borderSize;
    const boardSize = boardStyle.boardSize;
    const boardGap = boardStyle.gap;
    const boardRadius = boardStyle.radius;
    const filterTasks = useSelector(state => state.tasks.filterTasks);
    const chosenAssignee = useSelector(state => state.tasks.assignee);

    const taskStyle = {
        padding: padding ? padding + 'px' : '20px',
        borderRadius: radius ? radius + 'px' : '0',
        border: `solid ${borderSize ? borderSize + 'px' : '1px'} ${borderColor ? borderColor : '#005fa8'}` || 'solid 1px #005fa8',
        background: taskColor ? taskColor : '#d5d5d5',
    }

    const handleDeleteColumn = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this column?");
        if (isConfirmed) {
            setTimeout(() => {
                dispatch(deleteColumnHandler(id));
            }, 300);
        }
    }

    const storedStyle = {
        border: `solid ${boardBorderSize ? boardBorderSize + 'px' : '1px'} ${boardBorderColor ? boardBorderColor : '#005fa8'}`,
        minWidth: boardSize ? boardSize + 'px' : '400px',
        maxWidth: boardSize ? boardSize + 'px' : '400px',
        borderRadius: boardRadius ? boardRadius + 'px' : '0',
        marginRight: boardGap ? boardGap + 'px' : 0
    }

    return (
        <div className='column' title={column.title}
        style={{
            ...storedStyle,
            ...(deleteColumn
            ? {transform: 'translateY(100%)', opacity: 0}
            : {transform: 'translateY(0%)', opacity: 1})
        }}>
             {editableColumnTitle === column.id ? (
                            <input type='text'
                                value={column.title}
                                onChange={(e) => dispatch(updateColumnName({id: column.id, title: e.target.value}))}
                                autoFocus
                                onBlur={() => setEditableColumnTitle(null)}
                            />
                        ) : (
                            <h2 onDoubleClick={() => setEditableColumnTitle(column.id)}>{column.title}</h2>
                        )}
            <h5 className='deleteColumnBtn' onClick={() => (setDeleteColumn(true), handleDeleteColumn(column.id))}>Delete {column.title}</h5>
            <div className='columnWrapper' style={{gap: gap ? gap + 'px' : '20px'}}>
                {filterTasks ?
                tasks.map(task => (task.columnName === column.title && task.assignees.some(assignee => assignee.email === chosenAssignee.email)) &&
                <Task key={task.id} taskStyle={taskStyle} task={task} handleMouseDown={handleMouseDown} />
                )
            :
                tasks.map(task => task.columnName === column.title &&
                <Task key={task.id} taskStyle={taskStyle} task={task} handleMouseDown={handleMouseDown} />
                )
            }
            </div>
        </div>
    )
}

Column.propTypes = {
    // column: propTypes.string,
    tasks: propTypes.array,
    handleMouseDown: propTypes.func
}

export default Column;
