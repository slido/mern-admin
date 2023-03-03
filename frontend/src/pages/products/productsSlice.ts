import { createAsyncThunk, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { destroy, get, post, put } from "../../api/api";

export interface Product { 
    _id?: string;
    title?: string;
    description?: string;
    status?: string;
    categories?: string[];
}

interface ProductState {
    products: Product[];
    loading: boolean; 
    singleProduct: Product;
    errors: any; 
}

const initialState: ProductState = {
    products: [],
    singleProduct: {},
    loading: false,
    errors: null, 
}


// actions are processes that get data from backend
export const getProducts = createAsyncThunk<Product[]>(
    "products/getProducts",
    async (_, thunkAPI) => {
        try {
            const response = await get("/products");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getProductById = createAsyncThunk<Product, string>(
    "products/getProductsById",
    async (id, thunkAPI) => {
        try {
            const response = await get(`/products/${ id }`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const createProduct = createAsyncThunk<Product, Object>(
    "products/createProduct",
    async (data, thunkAPI) => {
        try {
            const response = await post("/products", data);
            thunkAPI.dispatch(getProducts());
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const updateProduct = createAsyncThunk<Product, Object|any>(
    "products/updateProduct",
    async (data, thunkAPI) => {
        try {
            const response = await put(`/products/${ data._id }`, data);
            thunkAPI.dispatch(getProducts());
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const deleteProduct = createAsyncThunk<string,string | undefined>(
    "products/deleteProduct",
    async (id, thunkAPI) => {
        try {
            const response = await destroy(`/products/${id}`);
            thunkAPI.dispatch(getProducts());
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
) 


// reducers -> reduce to a specific state -> changes state
export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload
        }
    },
    extraReducers: (builder) =>
    {
        builder.addCase(getProducts.pending, (state) =>
            {
                state.loading = true
            });
        builder.addCase(getProducts.fulfilled, (state, action: PayloadAction<Product[]>) =>{
            // return {
            //     ...state,
            //     products: action.payload,
            //     loading:false
            // }
            state.loading = false;
            state.products = action.payload;
        })
        builder.addCase(getProducts.rejected, (state, action: PayloadAction<any>) => {
            return {
                ...state,
                errors: action.payload,
                loading:false
            }
        });
        builder.addCase(getProductById.pending, (state) =>
        {
            state.loading = true;
        });
        builder.addCase(getProductById.fulfilled, (state, action: PayloadAction<Product>) =>
        {
            // state.loading = false;
            // state.singleProduct = action.payload;
            return {
                ...state,
                singleProduct: action.payload,
                loading:false
            }
            
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => { 
            return {
                ...state,
                singleProduct: action.payload,
            }
        });
    }
})

export default productSlice.reducer;
export const { setProducts } = productSlice.actions;