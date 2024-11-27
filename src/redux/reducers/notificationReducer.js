import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Fetch notifications
export const fetchNotifications = createAsyncThunk(
    "notifications/fetchNotifications",
    async () => {
        const response = await fetch(`/api/notifications`);
        if (!response.ok) {
            throw new Error("Failed to fetch notifications");
        }
        const data = await response.json();
        return data.notifications; // Ensure this matches the API response structure
    }
);

// Delete all notifications
export const deleteAllNotifications = createAsyncThunk(
    "notifications/deleteAllNotifications",
    async () => {
        const response = await fetch(`/api/notifications`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete notifications");
        }
        const data = await response.json();
        return data; // API returns success message and deleted count
    }
);

const notificationSlice = createSlice({
    name: "notifications",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        addNotification: (state, action) => {
            state.items.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle fetch notifications
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload || [];
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Handle delete all notifications
            .addCase(deleteAllNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAllNotifications.fulfilled, (state) => {
                state.loading = false;
                state.items = []; // Clear all notifications from the state
            })
            .addCase(deleteAllNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
