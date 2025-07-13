import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isProfileSetup: false,
  isEngagementShown: false,
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    ProfileSetupCompleted: (state) => {
      state.isProfileSetup = true;
    },
    // You can add more reducers if needed, e.g.:
    resetProfileSetup: (state) => {
      state.isProfileSetup = false;
    },
    EngagementShown: (state) => {
      state.isEngagementShown = true;
    },
    resetEngagementShown: (state) => {
      state.isEngagementShown = false;
    },
  },
});

// Export actions
export const { ProfileSetupCompleted, resetProfileSetup, EngagementShown, resetEngagementShown } = userProfileSlice.actions;

// Export reducer
export default userProfileSlice.reducer;

// Optionally, you can export selectors
export const selectIsProfileSetup = (state: { userProfile: typeof initialState }) =>
  state.userProfile.isProfileSetup;