import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {
    currentUser: localStorage.getItem("currentUser")
        ? JSON.parse(localStorage.getItem("currentUser"))
        : null,
    loading: false,
    isEditable: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchtoggle: (state, action) => {
            state.loading = true
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            localStorage.setItem("currentUser", JSON.stringify(action.payload))
            localStorage.setItem("created-at", Date(Date.now()))
        },
        deleteUser: (state, action) => {
            state.currentUser = null;
            localStorage.clear();
        },
        logoutUser: (state) => {
            state.currentUser = null;
            localStorage.clear();
        },
        updateStart: (state) => {
            state.isEditable = true
        },
        updateCancel: (state) => {
            state.isEditable = false
        },
        updateSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            localStorage.setItem("currentUser", JSON.stringify(action.payload));
        }
    }
})

export const { fetchtoggle, fetchSuccess, deleteUser, logoutUser, updateStart, updateCancel, updateSuccess } = userSlice.actions;

export default userSlice.reducer;
