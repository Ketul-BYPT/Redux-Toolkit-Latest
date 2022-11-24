import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isOpen: false,
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		modalOpen: (store, action) => {
			store.isOpen = true;
		},
		modalClose: (store, action) => {
			store.isOpen = false;
		},
	},
});

export const { modalOpen, modalClose } = modalSlice.actions;

export default modalSlice.reducer;
