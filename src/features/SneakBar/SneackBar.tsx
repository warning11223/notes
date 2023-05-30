import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useSelector} from 'react-redux';
import {selectError} from '../../selectors';
import {errorActions} from '../../reducers/error/errorReducer';
import {useActions} from '../../common/utils';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function SneakBar() {
    const {setErrorAC} = useActions(errorActions)
    const error = useSelector(selectError);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorAC({error: null})
    };

    return (
        <Stack spacing={5} sx={{width: '100%'}}>
            <Snackbar open={error !== null} autoHideDuration={3000} onClose={handleClose}
                      anchorOrigin={{horizontal: 'center', vertical: 'top'}}>
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    {error}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
