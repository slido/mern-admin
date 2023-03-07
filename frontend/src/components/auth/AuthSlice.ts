import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi, post, put } from "../../api/api";
import { IReturn, User, UserState } from "../../interfaces/User";
import { IUser } from "../../pages/users/usersSlice";
import { errorTypes } from "../../utils/snackData";
import { activateSnackbar } from "../SnackBar/SnackBarSlice";

const initialState: UserState = {
  data: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  errors: null,
  profile: {},
};

//actions
export const loginUserAction = createAsyncThunk<IReturn, Object>(
  "user/loginUser",
  async (data, thunkAPI) => {
    try {
      const response = await authApi.post("/auth/signin", data);
      thunkAPI.dispatch(getUser(response.data));
      return response.data;
    } catch (error: any) {
      const snackData = {
        message: "User with this data is not registered!",
        severity: errorTypes.error,
      };
      thunkAPI.dispatch(activateSnackbar(snackData));
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registerUserAction = createAsyncThunk<IReturn, Object>(
  "user/registerUser",
  async (data, thunkAPI) => {
    try {
      const response = await authApi.post("/auth/signup", data);
      return response.data;
    } catch (error: any) {
      const snackData = {
        message: "User with this email is already registered!",
        severity: errorTypes.error,
      };
      thunkAPI.dispatch(activateSnackbar(snackData));
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateProfile = createAsyncThunk<IUser, Object | any>(
  "users/updateProfile",
  async (data, thunkAPI) => {
    try {
      const response = await put(`/users/${data._id}`, data);
      thunkAPI.dispatch(getUser(response.data));
      const user = response.data;

      const snackData = {
        message: "User updated!",
        severity: errorTypes.success,
      };
      thunkAPI.dispatch(activateSnackbar(snackData));

      return user;
    } catch (error) {
      const snackData = {
        message: error,
        severity: errorTypes.error,
      };
      thunkAPI.dispatch(activateSnackbar(snackData));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
    logoutUser(state) {
      state.isAuthenticated = false;
    },
    getUser(state, action) {
      //console.log(action.payload);
      state.profile.fName = action.payload.fname;
      state.profile.lName = action.payload.lname;
      state.profile.email = action.payload.email;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.profile.email = action.payload.profile.email;
      state.profile.fName = action.payload.profile.fname;
      state.profile.lName = action.payload.profile.lname;
      state.profile.id = action.payload.profile._id;
      state.errors = null; // clear errors
      window.location.replace("/");
    });
    builder.addCase(loginUserAction.rejected, (state, action: any) => {
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
      window.location.replace("/");
    });
    builder.addCase(registerUserAction.rejected, (state, action: any) => {
      state.loading = false;
      state.errors = action.payload.message;
    });
    builder.addCase(updateProfile.rejected, (state, action: any) => {
      state.loading = false;
      state.errors = action.payload.message;
    });
  },
});

export default authSlice.reducer;
export const { setUser, getUser, logoutUser } = authSlice.actions;
