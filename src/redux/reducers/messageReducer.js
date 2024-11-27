import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Thunk for fetching messages for a selected chat
export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (chatId) => {
    const response = await fetch(`/api/message/${chatId}`, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }

    const data = await response.json();
    return data.data; // Return the fetched messages
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    loading: false
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload); // Add a new message to state
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      });
  }
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;
