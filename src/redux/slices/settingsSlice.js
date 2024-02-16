import { createSlice } from "@reduxjs/toolkit";
import {
    fetchGenres,
    toggleGenre
} from "../thunks/settingsThunk";




const initialState = {
    notificationsState: {
        posts: true,
        follows: true,
        upvotes: true,
        comments: true,
        replies: true,
        mentions: true
    },
    reportOpen: false,
    notificationsOpen: false,
    tags: false,
    genreOpen: false,
    genreList: [],
    status: ""
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {


        openReport: (state, action) => {
            state.reportOpen = true;
        },
        closeReport: (state, action) => {
            state.reportOpen = false;
        },
        openGenre: (state, action) => {
            state.genreOpen = true;
        },
        closeGenre: (state, action) => {
            state.genreOpen = false;
        },
        openNotifications: (state, action) => {
            state.notificationsOpen = true;
        },
        closeNotifications: (state, action) => {
            state.notificationsOpen = false;
        },
        togglePosts: (state, action) => {
            state.notificationsState.posts = !state.notificationsState.posts;
        },
        toggleFollows: (state, action) => {
            state.notificationsState.follows = !state.notificationsState.follows;
        },
        toggleUpvotes: (state, action) => {
            state.notificationsState.upvotes = !state.notificationsState.upvotes;
        },
        toggleComments: (state, action) => {
            state.notificationsState.comments = !state.notificationsState.comments;
        },
        toggleReplies: (state, action) => {
            state.notificationsState.replies = !state.notificationsState.replies;
        },

        toggleMentions: (state, action) => {
            state.notificationsState.mentions = !state.notificationsState.mentions;
        },
        toggleTags: (state, action) => {
            state.tags = !state.tags;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(toggleGenre.pending, (state) => {
                state.status = "loading";
            })
            .addCase(toggleGenre.fulfilled, (state, action) => {
                state.status = "succeeded";
                // Check if the action was 'deleted'
                if (action.payload.action === 'deleted') {
                    const index = state.genreList.findIndex(genre => genre.id === action.payload.genre_id);
                    if (index !== -1) {
                        state.genreList[index].active = false;
                    }
                }
                // Check if the action was 'inserted'
                else if (action.payload.action === 'inserted') {
                    const index = state.genreList.findIndex(genre => genre.id === action.payload.record.id);
                    if (index !== -1) {
                        // If the genre already exists, set it as active
                        state.genreList[index].active = true;
                    } else {
                        // If the genre does not exist, add it to the top of the list
                        state.genreList.unshift({
                            id: action.payload.record.id,
                            name: action.payload.record.name,
                            active: true
                        });
                    }
                }
            })
            .addCase(toggleGenre.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchGenres.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.genreList = action.payload;
            })
            .addCase(fetchGenres.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
});

export const { openGenre,
    closeGenre,
    toggleTags,
    openNotifications,
    closeNotifications,
    togglePosts,
    toggleFollows,
    toggleUpvotes,
    toggleComments,
    toggleReplies,
    toggleMentions,
    openReport,
    closeReport
} = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
