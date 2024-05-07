import propTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { handleModal, handleEdit } from "../../features/modalSlice";
import { removeTask } from '../../features/taskSlice';

const TaskSettingMenu = ({ menu, setMenu, task }) => {
    const dispatch = useDispatch();

    const handleDeleteTask = () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this task?");
        if (isConfirmed) {
            dispatch(removeTask(task.id));
        }
    };

    return (
        menu &&
        <div id='taskSettingMenu'>
            <p onClick={() => (setMenu(false), dispatch(handleModal(task)), dispatch(handleEdit(true)))}>Edit</p>
            <p onClick={handleDeleteTask}>Delete</p>
            <p onClick={() => setMenu(false)}>Close Menu</p>
        </div>
    )
}

TaskSettingMenu.propTypes = {
    menu: propTypes.bool,
    setMenu: propTypes.func,
    task: propTypes.object
}

export default TaskSettingMenu;
