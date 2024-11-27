import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import defaultAvatar from "../../assets/defaultProfile.jpg";
// Adjusted async thunk for fetching private chats
export const fetchChats = createAsyncThunk("chat/fetchChats", async (searchQuery = "") => {
  const response = await fetch(`/api/chat?searchTerm=${searchQuery}`, {
    method: "GET"
  });

  if (!response.ok) {
    throw new Error("Failed to fetch private chats");
  }

  const data = await response.json();
  return { privateChats: data }; // Return the fetched private chats
});

// New async thunk for fetching group chats
export const fetchGroupChats = createAsyncThunk(
  "chat/fetchGroupChats",
  async (searchQuery = "") => {
    const response = await fetch(`/api/chat/group?searchTerm=${searchQuery}`, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error("Failed to fetch group chats");
    }

    const data = await response.json();
    return { groupChats: data }; // Return the fetched group chats
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    privateChats: [],
    groupChats: [],
    availableUsers: [],
    loading: true
  },
  reducers: {
    changePrivateChatName: (state, action) => {
      state.privateChats.forEach((chat) => {
        if (chat.usersRef[0]._id === action.payload) {
          chat.img = chat.usersRef[1].avatar
            ? chat.usersRef[1].avatar
            : defaultAvatar;
          chat.chatName = chat.usersRef[1].username;
        } else {
          chat.img = chat.usersRef[0].avatar
            ? chat.usersRef[0].avatar
            : defaultAvatar;
          chat.chatName = chat.usersRef[0].username;
        }
      });
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch private chats
      .addCase(fetchChats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = false;
        state.privateChats = action.payload.privateChats;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      })
      // Fetch group chats
      .addCase(fetchGroupChats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGroupChats.fulfilled, (state, action) => {
        state.loading = false;
        state.groupChats = action.payload.groupChats;
      })
      .addCase(fetchGroupChats.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      });
  }
});

export const { changePrivateChatName } = chatSlice.actions;
export default chatSlice.reducer;
