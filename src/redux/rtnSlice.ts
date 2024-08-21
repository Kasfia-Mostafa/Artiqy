import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the notification
interface LikeNotification {
    userId: string; 
    type: 'like' | 'dislike';
}

// Define the initial state type
interface RtnState {
    likeNotification: LikeNotification[];
}

// Initial state
const initialState: RtnState = {
    likeNotification: [],
};

// Create the slice
const rtnSlice = createSlice({
    name: 'realTimeNotification',
    initialState,
    reducers: {
        setLikeNotification: (state, action: PayloadAction<LikeNotification>) => {
            if (action.payload.type === 'like') {
                state.likeNotification.push(action.payload);
            } else if (action.payload.type === 'dislike') {
                state.likeNotification = state.likeNotification.filter(
                    (item) => item.userId !== action.payload.userId
                );
            }
        },
    },
});

// Export actions and reducer
export const { setLikeNotification } = rtnSlice.actions;
export default rtnSlice.reducer;
