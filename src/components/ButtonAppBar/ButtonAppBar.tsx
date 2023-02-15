import React from 'react';
import AppBar from '@mui/material/AppBar/AppBar';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography/Typography';
import Button from '@mui/material/Button/Button';
import Box from '@mui/material/Box/Box';

const ButtonAppBar = () => {
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
                        News
                    </Typography>
                    <Button color="info">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default ButtonAppBar;
