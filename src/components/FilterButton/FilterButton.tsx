import React from 'react';
import Button from '@mui/material/Button/Button';

type FilterButtonType = {
    changeFilterHandler: () => void
    color: 'warning'
    variant: 'contained' | 'text'
    children: React.ReactNode
}

export const FilterButton: React.FC<FilterButtonType> = React.memo(({changeFilterHandler, variant, color, children}) => {
    return (
        <Button
            variant={variant}
            size="small"
            color={color}
            onClick={changeFilterHandler}
        >{children}</Button>
    );
})
