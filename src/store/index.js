import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        // Add reducers here
        default: (state = {}) => state
    }
});

export default store;