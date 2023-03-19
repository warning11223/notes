import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {action} from '@storybook/addon-actions';
import EditableSpan from '../components/EditableSpan/EditableSpan';


export default {
    title: 'EditableSpan',
    component: EditableSpan,
} as ComponentMeta<typeof EditableSpan>;

const editHandler = action('Span was edited')

export const EditableSpanExample: ComponentStory<typeof EditableSpan> = () => (
    <EditableSpan editCallback={editHandler} children={'task1'} />
);
