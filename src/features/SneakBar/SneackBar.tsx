import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {useAppDispatch} from '../../app/hooks';
import {setErrorAC} from '../../reducers/errorReducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function SneakBar() {
    const dispatch = useAppDispatch();
    const error = useSelector<RootState, string | null>(state => state.errorReducer.error);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setErrorAC(null))
    };

    return (
        <Stack spacing={5} sx={{ width: '100%' }}>
            <Snackbar open={error !== null} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{horizontal: 'center', vertical: 'top'}}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
