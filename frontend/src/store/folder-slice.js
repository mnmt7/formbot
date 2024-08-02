import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createFolder, deleteFolder, fetchFolder } from "../api/folder";
import { deleteFormbot } from "../api/formbot";

export const fetchFolderAsync = createAsyncThunk("folder/fetch", async (id) => {
  const response = await fetchFolder(id);
  return response.data;
});

export const createFolderAsync = createAsyncThunk(
  "folder/create",
  async (data) => {
    const response = await createFolder(data);
    return response.data;
  }
);

export const deleteFolderAsync = createAsyncThunk(
  "folder/delete",
  async (id) => {
    await deleteFolder(id);
    return id;
  }
);

export const deleteFormbotAsync = createAsyncThunk(
  "formbot/delete",
  async (id) => {
    await deleteFormbot(id);
    return id;
  }
);

const initialState = {
  folder: null,
  status: "idle",
  error: null,
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchFolderAsync.fulfilled, (state, action) => {
        action.payload.data.folders =
          action.payload.data.folders.length === 0
            ? state.folder?.folders
            : action.payload.data.folders;
        state.folder = action.payload.data;
        // console.log({ fikder: state.folder });
      })
      .addCase(createFolderAsync.fulfilled, (state, action) => {
        state.folder.folders.push(action.payload.data);
      })
      .addCase(deleteFolderAsync.fulfilled, (state, action) => {
        state.folder.folders = state.folder.folders.filter((folder) => {
          return folder._id !== action.payload;
        });
      })
      .addCase(deleteFormbotAsync.fulfilled, (state, action) => {
        state.folder.formbots = state.folder.formbots.filter((formbot) => {
          return formbot._id !== action.payload;
        });
      });
  },
});

export const folderActions = folderSlice.actions;

export const selectFolder = (state) => state.folder.folder;

export default folderSlice;
