import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import cartItems from "../../cartItems";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
	cartItems: [],
	total: 0,
	amount: 0,
	isLoading: true,
};

export const getCartItems = createAsyncThunk(
	"cart/getCartItems",
	async (name, thunkAPI) => {
		try {
			// console.log(name);
			// console.log(thunkAPI);
			// console.log(thunkAPI.getState());
			// thunkAPI.dispatch(openModal());
			const resp = await axios(url);
			console.log(resp.data);
			return resp.data;
		} catch (error) {
			return thunkAPI.rejectWithValue("something went wrong");
		}
	}
);

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		clearCart: (store) => {
			store.cartItems = [];
		},
		removeItem: (store, action) => {
			const itemId = action.payload;
			store.cartItems = store.cartItems.filter((item) => item.id !== itemId);
		},
		increase: (store, { payload }) => {
			const cartItem = store.cartItems.find((item) => item.id === payload.id);
			cartItem.amount = cartItem.amount + 1;
		},
		decrease: (store, { payload }) => {
			const cartItem = store.cartItems.find((item) => item.id === payload.id);
			cartItem.amount = cartItem.amount - 1;
		},
		calculateTotals: (store) => {
			let amount = 0;
			let total = 0;
			store.cartItems.forEach((item) => {
				amount += item.amount;
				total += item.amount * item.price;
			});
			store.amount = amount;
			store.total = total;
		},
	},
	extraReducers: {
		[getCartItems.pending]: (store) => {
			store.isLoading = true;
		},
		[getCartItems.fulfilled]: (store, action) => {
			store.isLoading = false;
			store.cartItems = action.payload;
		},
		[getCartItems.rejected]: (store, action) => {
			console.log(action);
			store.isLoading = false;
		},
	},
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
	cartSlice.actions;

export default cartSlice.reducer;
