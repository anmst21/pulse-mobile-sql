import { createSlice } from "@reduxjs/toolkit";
import {
    fetchGenres,
    toggleGenre
} from "../thunks/settingsThunk";




const initialState = {
    profileEditState: {
        userNameEdit: false,
        linkEdit: false,
        bioEdit: false
    },
    notificationsState: {
        posts: true,
        follows: true,
        upvotes: true,
        comments: true,
        replies: true,
        mentions: true
    },
    shadowListOpen: false,
    reportOpen: false,
    notificationsOpen: false,
    genreOpen: false,
    tags: false,
    imageMenuOpen: false,
    genreList: [],
    status: ""
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setImageMenuOpen: (state, action) => {
            state.imageMenuOpen = action.payload;
        },

        editLink: (state, action) => {
            state.profileEditState.linkEdit = true;
        },
        closeLink: (state, action) => {
            state.profileEditState.linkEdit = false;
        },
        editBio: (state, action) => {
            state.profileEditState.bioEdit = true;
        },
        closeBio: (state, action) => {
            state.profileEditState.bioEdit = false;
        },
        editUserName: (state, action) => {
            state.profileEditState.userNameEdit = true;
        },
        closeUserName: (state, action) => {
            state.profileEditState.userNameEdit = false;
        },
        openReport: (state, action) => {
            state.reportOpen = true;
        },
        closeReport: (state, action) => {
            state.reportOpen = false;
        },
        openGenre: (state, action) => {
            state.genreOpen = true;
        },
        closeShadowList: (state, action) => {
            state.shadowListOpen = false;
        },
        openShadowList: (state, action) => {
            state.shadowListOpen = true;
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
    // [{ "active": false, "id": 8, "name": "Acid House" },
    //     { "active": false, "id": 39, "name": "Ambient" },
    //     { "active": false, "id": 91, "name": "Bass Music" },
    //     { "active": false, "id": 138, "name": "Breakbeat" },
    //     { "active": false, "id": 209, "name": "Chill-out" },
    //     { "active": false, "id": 457, "name": "Disco" },
    //     { "active": false, "id": 478, "name": "Drum And Bass" },
    //     { "active": false, "id": 480, "name": "Dub" },
    //     { "active": false, "id": 498, "name": "Edm" },
    //     { "active": false, "id": 500, "name": "Electro" },
    //     { "active": false, "id": 583, "name": "Funk" },
    //     { "active": false, "id": 592, "name": "Gabba" },
    //     { "active": true, "id": 659, "name": "Hardcore" },
    //     { "active": false, "id": 664, "name": "Hardstyle" },
    //     { "active": false, "id": 677, "name": "Hip Hop" },
    //     { "active": false, "id": 688, "name": "House" },
    //     { "active": false, "id": 718, "name": "Industrial" },
    //     { "active": true, "id": 722, "name": "Intelligent Dance Music" },
    //     { "active": false, "id": 780, "name": "Jungle" },
    //     { "active": false, "id": 1258, "name": "Techno" },
    //     { "active": false, "id": 1288, "name": "Trance" },
    //     { "active": false, "id": 1313, "name": "Uk Garage" },
    //     { "active": false, "id": 1334, "name": "Video Game Music" }]
    // { "action": "inserted", "record": { "genre_id": 8, "id": 33, "user_id": 17 } }
    // { "action": "deleted", "genre_id": 91, "user_id": "17" }
    extraReducers: (builder) => {
        builder
            .addCase(toggleGenre.pending, (state) => {
                state.status = "loading";
            })
            .addCase(toggleGenre.fulfilled, (state, action) => {
                state.status = "succeeded";
                console.log("action.payloadaction.payload", action.payload)
                // Check if the action was 'deleted'
                if (action.payload.action === 'deleted') {
                    const index = state.genreList.findIndex(genre => genre.id === action.payload.record.id);
                    if (index !== -1) {
                        // If you want to completely remove the item
                        //state.genreList.splice(index, 1);

                        // Or if you prefer to set it as inactive
                        state.genreList[index].active = false;
                    }
                }
                // Check if the action was 'inserted'
                else if (action.payload.action === 'inserted') {
                    const index = state.genreList.findIndex(genre => genre.id === action.payload.record.id);
                    if (index !== -1) {
                        // Record found, set it as active
                        state.genreList[index].active = true;
                    } else {
                        // No record found, insert the new record and set it as active
                        const newGenre = {
                            ...action.payload.record,
                            active: true  // Assuming the server doesn't include the active flag or you want to ensure it's true
                        };
                        state.genreList.push(newGenre);
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
    closeReport,
    editLink,
    closeLink,
    editBio,
    closeBio,
    editUserName,
    closeUserName,
    closeShadowList,
    openShadowList,
    setImageMenuOpen
} = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
