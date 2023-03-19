import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {action} from '@storybook/addon-actions';
import Task from '../components/Task/Task';
import {Provider} from 'react-redux';
import {store} from '../redux/store';
import {ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator';

export default {
    title: 'Task',
    component: Task,
    decorators: [
        ReduxStoreProviderDecorator
    ]
} as ComponentMeta<typeof Task>;

const changeTaskCheckbox = action('Checkbox changed')

export const TaskItemExample: ComponentStory<typeof Task> = () => (
    <>
        <Task task={{ id: '1', title: 'task 1', isDone: false }} todolistId={'todoListId1'} />
        <Task task={{ id: '2', title: 'task 2', isDone: true }} todolistId={'todoListId1'} />
    </>
);
