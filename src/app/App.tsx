import React from 'react';
import './App.css';
import createTheme from '@mui/material/styles/createTheme';
import {ThemeProvider} from '@mui/material/styles';
import Container from '@mui/material/Container/Container';
import ButtonAppBar from '../components/ButtonAppBar/ButtonAppBar';
import {useSelector} from 'react-redux';
import {RootState} from './store';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import {StatusTypes} from '../reducers/errorReducer';
import {TodolistsList} from '../features/TodolistsList/TodolistList';

export type FilterValuesType = 'all' | 'active' | 'completed';

const theme = createTheme({
    palette: {
        secondary: {
            main: '#ffa726'
        },
        info: {
            main: '#ffffff'
        }
    },
});

type AppPropsType = {
    demo?: boolean
}

const App: React.FC<AppPropsType> = ({demo}) => {
    const status = useSelector<RootState, StatusTypes>(state => state.errorReducer.status)

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <ButtonAppBar/>
                {status === 'loading' && <LinearProgress color="warning"/>}
            </ThemeProvider>

            <Container maxWidth="lg">
                <TodolistsList demo={demo}/>
            </Container>
        </div>
    );
}

export default App;
