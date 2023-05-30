import React from 'react';
import AppBar from '@mui/material/AppBar/AppBar';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography/Typography';
import Button from '@mui/material/Button/Button';
import Box from '@mui/material/Box/Box';
import {selectIsLoggedIn} from '../../selectors';
import {authThunks} from '../../reducers/auth/authReducer';
import {useAppDispatch, useAppSelector} from '../../common/hooks';
import {useActions} from '../../common/utils';

export const ButtonAppBar = () => {
    const { logout } = useActions(authThunks)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const logoutHandler = () => {
        logout()
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="info"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}} color="white">
                        SCRATCHPAD
                    </Typography>
                    {
                        isLoggedIn &&  <Button color="info" onClick={logoutHandler}>Logout</Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
};
