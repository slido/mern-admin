import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  authApi, post } from "../../api/api";
import { IReturn, User, UserState } from "../../interfaces/User";
import { itemFromStorage } from "../../utils/helpers";
import { errorTypes } from "../../utils/snackData";
import { activateSnackbar } from "../SnackBar/SnackBarSlice";

const initialState: UserState = {
    data: null,
    token: itemFromStorage("token"),
    isAuthenticated:itemFromStorage("isAuthenticated"),
    loading: false,
    errors: null,
    profile: {
        id: itemFromStorage("profile")?.id,
        fName: itemFromStorage("profile")?.fName,
        lName: itemFromStorage("profile")?.lName,
    }
}

//actions
export const loginUserAction = createAsyncThunk<IReturn, Object>(
    "user/loginUser",
    async (data, thunkAPI) => {
        try {
            const response = await  authApi.post("/auth/signin", data);
            thunkAPI.dispatch(getUser());         
            return response.data;
        } catch (error:any)
        {
            const snackData = {
                message: "User with this data is not registered!",
                severity:errorTypes.error
            }
            thunkAPI.dispatch(activateSnackbar(snackData))
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const registerUserAction = createAsyncThunk<IReturn, Object>(
    "user/registerUser",
    async (data, thunkAPI) => {
        try {
            const response = await  authApi.post("/auth/signup", data);

            return response.data;
        } catch (error:any) {
            const snackData = {
                message: "User with this email is already registered!",
                severity:errorTypes.error
            }
            thunkAPI.dispatch(activateSnackbar(snackData))  
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)


// reducers -> reduce to a specific state -> changes state
export const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.data = action.payload
        },
        logoutUser(state) {
            state.isAuthenticated = false;
            localStorage.removeItem("token");
            localStorage.removeItem("profile");
            localStorage.removeItem("isAuthenticated");
        },
        getUser(state) {
            state.isAuthenticated = itemFromStorage("isAuthenticated");
            state.token = itemFromStorage("token");
            state.profile.fName = itemFromStorage("profile")?.fName;
            state.profile.lName = itemFromStorage("profile")?.lName;
            state.profile.id = itemFromStorage("profile")?.id;
          },
        // filterGame: (state, action) => {
        //     state.games = state.games?.filter(game => game._id != action.payload)!;
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUserAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.profile.fName = action.payload.profile.fname;
            state.profile.lName = action.payload.profile.lname;
            state.profile.id = action.payload.profile._id;
            localStorage.setItem("token", JSON.stringify(state.token));
            localStorage.setItem("profile", JSON.stringify(state.profile));
            localStorage.setItem("isAuthenticated", JSON.stringify(true));
            window.location.replace("/")
        });
        builder.addCase(loginUserAction.rejected, (state, action:any) => {
            state.loading = false;
            state.errors = action.payload.message;
            
        });
        builder.addCase(registerUserAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.profile.fName = action.payload.profile.fname;
            state.profile.lName = action.payload.profile.lname;
            state.profile.id = action.payload.profile._id;
            localStorage.setItem("token", JSON.stringify(state.token));
            localStorage.setItem("profile", JSON.stringify(state.profile));
            localStorage.setItem("isAuthenticated", JSON.stringify(true));
            window.location.replace("/")
        });
        builder.addCase(registerUserAction.rejected, (state, action:any) => {
            state.loading = false;
            state.errors = action.payload.message;
        });
      
    }
})

export default authSlice.reducer;
export const { setUser, getUser, logoutUser } = authSlice.actions;