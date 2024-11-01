import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuState {
	activeTab: string; // Store the name or id of the active tab
}

const initialState: MenuState = {
	activeTab: "home", // default tab, e.g., 'home'
};

const menuSlice = createSlice({
	name: "menu",
	initialState,
	reducers: {
		setActiveTab: (state, action: PayloadAction<string>) => {
			state.activeTab = action.payload;
		},
	},
});
export const { setActiveTab } = menuSlice.actions;
export default menuSlice.reducer;
