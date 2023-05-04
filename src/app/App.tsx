import React, {useEffect} from 'react';
import './App.css';
import createTheme from '@mui/material/styles/createTheme';
import {ThemeProvider} from '@mui/material/styles';
import Container from '@mui/material/Container/Container';
import ButtonAppBar from '../components/ButtonAppBar/ButtonAppBar';
import {useSelector} from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {TodolistsList} from '../features/TodolistsList/TodolistList';
import {Login} from '../features/Login/Login';
import {SneakBar} from '../features/SneakBar/SneackBar';
import {useAppDispatch} from './hooks';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import {selectStatus} from '../selectors/errorSelectors';
import {authThunks} from '../reducers/authReducer';

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

const router = createBrowserRouter([
    {
        path: '/',
        element: <TodolistsList/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '*',
        element: <h1>404 not found</h1>
    }
]);

const App: React.FC<AppPropsType> = ({demo}) => {
    const dispatch = useAppDispatch()
    const status = useSelector(selectStatus)

    useEffect(() => {
        dispatch(authThunks.authMe())
    }, []);

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <ButtonAppBar/>
                {status === 'loading' && <LinearProgress color="warning"/>}
            </ThemeProvider>

            {
                status === 'initialized'
                    ? <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                        <CircularProgress disableShrink color={'warning'} size={80}/>
                    </div>
                    : <Container maxWidth="lg">
                        <RouterProvider router={router}/>
                    </Container>
            }

            <SneakBar/>
        </div>
    );
}

export default App;
