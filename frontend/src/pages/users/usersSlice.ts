import { createAsyncThunk, createSlice,   PayloadAction } from "@reduxjs/toolkit";
import { destroy, get, post, put } from "../../api/api";

export interface IUser { 
    _id?: string | null;
    fname?: string | null;
    lname?: string | null;
    address?: string | null;
    email?: string | null;
    accountType?: string | null;
    status?: boolean | null;
    password?: string | null;
}

interface UsersState {
    users: IUser[];
    loading: boolean; 
    singleUser: IUser;
    errors: any; 
}

const initialState: UsersState = {
    users: [],
    singleUser: {},
    loading: false,
    errors: null, 
}


// actions are processes that get data from backend
export const getUsers = createAsyncThunk<IUser[]>(
    "users/getUsers",
    async (_, thunkAPI) => {
        try {
            const response = await get("/users");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getUserById = createAsyncThunk<IUser, string>(
    "users/getUserById",
    async (id, thunkAPI) => {
        try {
            const response = await get(`/users/${ id }`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const createUser = createAsyncThunk<IUser, Object>(
    "users/createUser",
    async (data, thunkAPI) => {
        try {
            const response = await post("/users", data);
            thunkAPI.dispatch(getUsers());
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const updateUser = createAsyncThunk<IUser, Object|any>(
    "users/updateUser",
    async (data, thunkAPI) =>
    {
        try {
            const response = await put(`/users/${ data._id }`, data);
            thunkAPI.dispatch(getUsers());
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const deleteUser = createAsyncThunk<string,string | undefined>(
    "users/deleteUser",
    async (id, thunkAPI) => {
        try {
            const response = await destroy(`/users/${id}`);
            thunkAPI.dispatch(getUsers());
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
) 


// reducers -> reduce to a specific state -> changes state
export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<IUser[]>) => {
            state.users = action.payload
        }
    },
    extraReducers: (builder) =>
    {
        builder.addCase(getUsers.pending, (state) =>
            {
                state.loading = true
            });
        builder.addCase(getUsers.fulfilled, (state, action: PayloadAction<IUser[]>) =>{
            // return {
            //     ...state,
            //     products: action.payload,
            //     loading:false
            // }
            state.loading = false;
            state.users = action.payload;
        })
        builder.addCase(getUsers.rejected, (state, action: PayloadAction<any>) => {
            return {
                ...state,
                errors: action.payload,
                loading:false
            }
        });
        builder.addCase(getUserById.pending, (state) =>
        {
            state.loading = true;
        });
        builder.addCase(getUserById.fulfilled, (state, action: PayloadAction<IUser>) =>
        {
            // state.loading = false;
            // state.singleProduct = action.payload;
            return {
                ...state,
                singleUser: action.payload,
                loading:false
            }
            
        });
        builder.addCase(updateUser.fulfilled, (state, action) => { 
            return {
                ...state,
                singleUser: action.payload,
            }
        });

        builder.addCase(updateUser.rejected, (state, action: PayloadAction<any>) =>
        {
            console.log("action.payload",action.payload)
            if (action.payload.response.status === 409)
            {
                return {
                    ...state,
                    errors: action.payload,
                    loading: false
                }
            } else  if (action.payload.response.status === 500)
            { 
                return {
                    ...state,
                    errors: action.payload,
                    loading: false
                }
            }
        });
    }
})

export default usersSlice.reducer;
export const { setUsers } = usersSlice.actions;