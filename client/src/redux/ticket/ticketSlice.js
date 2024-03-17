// ticketSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTickets: [],
  totalPrice: 0
};

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    setConfirmedTickets: (state, action) => {
      state.selectedTickets = action.payload;
    },
    setFinalPrice: (state, action) => {
      state.totalPrice = action.payload;
    }
  }
});

export const { setConfirmedTickets, setFinalPrice } = ticketSlice.actions;

export default ticketSlice.reducer;