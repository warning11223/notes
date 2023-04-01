import React, {useEffect, useState} from 'react'
import {todolistAPI} from '../api/todolist-api';

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistAPI.getTodolists()
            .then(todolists => setState(todolists))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistAPI.createTodolist('28.03.2023')
            .then(res => setState(res))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistAPI.removeTodolist('63630817-1962-4c73-977d-04cb871869e9')
            .then(res => setState(res))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistAPI.editTodolist('68208f6c-1e6e-4cc7-a19f-dd36cf56472c', 'new 2023')
            .then(res => setState(res))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistID = '63630817-1962-4c73-977d-04cb871869e9'

    useEffect(() => {
        todolistAPI.getTasks(todolistID)
            .then(res => setState(res))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistID = '63630817-1962-4c73-977d-04cb871869e9'

    useEffect(() => {
        todolistAPI.addTask(todolistID, 'new task')
            .then(res => setState(res))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistID = '63630817-1962-4c73-977d-04cb871869e9'
    const taskID = '6820d652-0e8c-47ad-81c9-eaee9d8c15a4'

    useEffect(() => {
        todolistAPI.editTask(todolistID, taskID, {
            title: 'hello world!!!',
            completed: true,
            deadline: '',
            description: '',
            priority: 0,
            startDate: '',
            status: 200
        })
            .then(res => setState(res))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistID = '63630817-1962-4c73-977d-04cb871869e9'
    const taskID = '6820d652-0e8c-47ad-81c9-eaee9d8c15a4'

    useEffect(() => {
        todolistAPI.deleteTask(todolistID, taskID)
            .then(res => setState(res))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
