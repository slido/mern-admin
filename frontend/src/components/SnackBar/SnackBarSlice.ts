import { AlertColor } from '@mui/material';
import { createSlice } from "@reduxjs/toolkit";
 
export interface SnackBar { 
    loading: boolean,
    errors: any,
    open: boolean,
    message: string,
    severity:AlertColor | undefined
}
interface SnackBarState {
    loading: boolean,
    errors: any,
    open: boolean,
    message: string,
    severity:AlertColor | undefined
 }

const initialState: SnackBarState = {
    open: false,
    loading: false,
    errors: null,
    message: '',
    severity:undefined
}



// reducers -> reduce to a specific state -> changes state
export const snackBarSlice = createSlice({
    name: "snackBar",
    initialState,
    reducers: {
        activateSnackbar: (state, action) => {
            state.open = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
        },
        deactivateSnackbar: (state) => {
            state.open = false;
            state.message = '';
        }
    },
    
})

export default snackBarSlice.reducer;
export const { activateSnackbar, deactivateSnackbar } = snackBarSlice.actions;