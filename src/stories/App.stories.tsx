import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import App from '../App';
import {ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator';



export default {
    title: 'App',
    component: App,
    decorators: [
        ReduxStoreProviderDecorator
    ]

} as ComponentMeta<typeof App>;


export const AppExample: ComponentStory<typeof App> = () => (
    <App />
);
