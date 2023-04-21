import { createSlice } from '@reduxjs/toolkit';
const cartStored = localStorage.getItem('cartInfos')
  ? JSON.parse(localStorage.getItem('cartInfos'))
  : {
      number: 0,
      totalprice: 0,
      elements: [],
    };
export const CartSlice = createSlice({
  name: 'Cart',
  initialState: cartStored,
  reducers: {
    increment: (state, action) => {
      console.log(action.payload);
      const arr = JSON.parse(JSON.stringify(state));
      const isElementExist = arr.elements.filter(
        (element) => element.product._id == action.payload._id
      );
      console.log(isElementExist);
      if (isElementExist.length == 0) {
        const newstate = {
          ...state,
          totalprice: state.totalprice + action.payload.price,
          number: state.number + 1,
          elements: [
            ...state.elements,
            { product: action.payload, numberproduct: 1 },
          ],
        };
        localStorage.setItem('cartInfos', JSON.stringify(newstate));
        return newstate;
      } else {
        const newstate = {
          number: state.number + 1,
          totalprice: state.totalprice + action.payload.price,
          elements: state.elements.map((el) => {
            if (el.product._id == action.payload._id) {
              return {
                product: el.product,
                numberproduct: el.numberproduct + 1,
              };
            } else
              return { product: el.product, numberproduct: el.numberproduct };
          }),
        };
        localStorage.setItem('cartInfos', JSON.stringify(newstate));
        return newstate;
      }
    },
    decrement: (state, action) => {
      console.log(action.payload);
      const arr = JSON.parse(JSON.stringify(state));
      const isElementExist = arr.elements.filter(
        (element) => element.product._id == action.payload._id
      );
      console.log(isElementExist);
      const newstate = {
        number:
          isElementExist[0].numberproduct > 1 ? state.number - 1 : state.number,
        totalprice:
          isElementExist[0].numberproduct > 1
            ? state.totalprice - action.payload.price
            : state.totalprice,
        elements: state.elements.map((el) => {
          if (el.product._id == action.payload._id && el.numberproduct > 1) {
            return { product: el.product, numberproduct: el.numberproduct - 1 };
          } else
            return { product: el.product, numberproduct: el.numberproduct };
        }),
      };
      localStorage.setItem('cartInfos', JSON.stringify(newstate));
      return newstate;
    },
    remove: (state, action) => {
      const arr = JSON.parse(JSON.stringify(state));
      const isElementExist = arr.elements.filter(
        (element) => element.product._id == action.payload._id
      );
      const newstate = {
        number: state.number - isElementExist[0].numberproduct,
        totalprice:
          state.totalprice -
          action.payload.price * isElementExist[0].numberproduct,
        elements: arr.elements.filter(
          (el) => el.product._id !== action.payload._id
        ),
      };
      localStorage.setItem('cartInfos', JSON.stringify(newstate));
      return newstate;
    },
  },
});

export const { decrement, increment, remove } = CartSlice.actions;

export default CartSlice.reducer;
