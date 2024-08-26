import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the user details
interface UserDetails {
  profilePicture?: string;
  username: string;
}

// Define a type for the notification
interface LikeNotification {
  userId: string;
  type: "like" | "dislike";
  userDetails?: UserDetails; 
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
  name: "realTimeNotification",
  initialState,
  reducers: {
    setLikeNotification: (state, action: PayloadAction<LikeNotification>) => {
      console.log("setLikeNotification action triggered:", action.payload);

      const existingNotificationIndex = state.likeNotification.findIndex(
        (item) => item.userId === action.payload.userId
      );

      if (action.payload.type === "like") {
        // Check if the notification already exists
        if (existingNotificationIndex === -1) {
          state.likeNotification.push(action.payload);
          console.log("Notification added:", action.payload);
        } else {
          console.log("Notification already exists:", action.payload);
        }
      } else if (action.payload.type === "dislike") {
        if (existingNotificationIndex !== -1) {
          // Return a new array without the disliked notification
          state.likeNotification = state.likeNotification.filter(
            (item) => item.userId !== action.payload.userId
          );
          console.log("Notification removed:", action.payload);
        } else {
          console.log("No existing notification to remove for:", action.payload);
        }
      }
    },
  },
});

// Export actions and reducer
export const { setLikeNotification } = rtnSlice.actions;
export const selectLikeNotifications = (state: { realTimeNotification: RtnState }) =>
  state.realTimeNotification.likeNotification;

export default rtnSlice.reducer;
