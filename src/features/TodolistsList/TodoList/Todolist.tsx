import React, {useCallback, useEffect} from 'react';
import {FilterValuesType} from '../../../app/App';
import {AddForm} from '../../../components/AddForm';
import {EditableSpan} from '../../../components/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton/IconButton';
import {Task} from './Task';
import {FilterButton} from '../../../components/FilterButton';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import {useSelector} from 'react-redux';
import {TaskResponseType, TaskStatuses} from '../../../api/todolist-api';
import {selectStatus} from '../../../selectors';
import {tasksThunks} from '../../../reducers/tasks/tasksReducer';
import s from './TodoList.module.css';
import {useActions} from '../../../common/utils';
import {todolistFunctions} from '../../../reducers/todolist';
import {TodoListType} from '../../../reducers/todolist/todolistReducer';


type PropsType = {
    tasks: TaskResponseType[]
    todolist: TodoListType
    demo?: boolean
}

export const Todolist = React.memo((props: PropsType) => {
    const {editTodolist, removeTodolist, changeFilterAC} = useActions(todolistFunctions)
    const {addTask} = useActions(tasksThunks)
    const status = useSelector(selectStatus)

    useEffect(() => {
        if (props.demo) {
            return
        }
    }, [])

    const editTodolistHandler = useCallback((title: string) => {
        editTodolist({todolistID: props.todolist.id, title})
    }, [props.todolist.id])

    const addTaskHandler = useCallback((title: string) => {
        addTask({taskTitle: title, todolistID: props.todolist.id})
    }, [props.todolist.id])

    const removeTodolistHandler = useCallback(() => {
        removeTodolist({todolistID: props.todolist.id})
    }, [props.todolist.id])

    const changeFilterHandler = (filter: FilterValuesType) => {
        changeFilterAC({todolistID: props.todolist.id, filter})
    }

    const filterAll = useCallback(() => changeFilterHandler('all'), []);
    const filterActive = useCallback(() => changeFilterHandler('active'), []);
    const filterCompleted = useCallback(() => changeFilterHandler('completed'), []);

    let tasksForTodolist = props.tasks;

    if (props.todolist.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
    }

    const filteredTasks = tasksForTodolist.map(t => {
        return <Task
            key={t.id}
            task={t}
            todolistId={props.todolist.id}
            todolistEntityStatus={props.todolist.entityStatus}
        />
    })

    return <div className={s.wrapper}>
        <div className={s.titleContainer}>
            <IconButton
                color="error"
                onClick={removeTodolistHandler}
                disabled={props.todolist.entityStatus === 'loading'}
                style={{cursor: 'pointer', position: 'absolute', top: '-2px', right: '-4px'}}
            >
                <DeleteIcon fontSize="medium" />
            </IconButton>
            <h3>
                <EditableSpan editCallback={editTodolistHandler}>{props.todolist.title}</EditableSpan>
            </h3>
        </div>

        <AddForm placeholder="Add task" addTaskCallback={addTaskHandler}
                 disabled={props.todolist.entityStatus === 'loading'}/>

        <ul className={s.ul}>
            {
                !props.tasks.length && <div style={{margin: '0 auto'}}>No tasks ☹️</div>
            }
            {
                status === 'loadingTasks' ? <CircularProgress color="warning"/> : filteredTasks
            }
        </ul>
        <div>
            <FilterButton
                changeFilterHandler={filterAll}
                color={props.todolist.filter === 'all' ? 'warning' : 'warning'}
                variant={props.todolist.filter === 'all' ? 'contained' : 'text'}
            >All</FilterButton>
            <FilterButton
                changeFilterHandler={filterActive}
                color={props.todolist.filter === 'active' ? 'warning' : 'warning'}
                variant={props.todolist.filter === 'active' ? 'contained' : 'text'}
            >Active</FilterButton>
            <FilterButton
                changeFilterHandler={filterCompleted}
                color={props.todolist.filter === 'completed' ? 'warning' : 'warning'}
                variant={props.todolist.filter === 'completed' ? 'contained' : 'text'}
            >Completed</FilterButton>
        </div>
    </div>
})
