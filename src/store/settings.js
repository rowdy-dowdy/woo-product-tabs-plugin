import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  consumer_key: '',
  consumer_secret: ''
}

export const settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    saveSettings: (state, action) => {
      state.consumer_key += action.payload.consumer_key
      state.consumer_secret += action.payload.consumer_secret
    },
  },
})

// Action creators are generated for each case reducer function
export const { saveSettings } = settings.actions

export default settings.reducer