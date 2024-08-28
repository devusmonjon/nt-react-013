export const initialState = JSON.parse(localStorage.getItem("store")) || {
  son: 9,
  wishlist: [],
  user: null,
};
export const reducer = (state, action) => {
  let memory = {};
  switch (action.type) {
    case "TOGGLE_WISHLIST":
      let index = state.wishlist.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index < 0) {
        memory = { ...state, wishlist: [...state.wishlist, action.payload] };
        saveStorege(memory);
        return memory;
      } else {
        memory = {
          ...state,
          wishlist: state.wishlist.filter(
            (item) => item.id !== action.payload.id
          ),
        };
        saveStorege(memory);
        return memory;
      }
    case "LOGIN":
      memory = { ...state, user: action.payload };
      saveStorege(memory);
      return memory;
    case "LOGOUT":
      memory = { ...state, user: null };
      saveStorege(memory);
      return memory;
    default:
      return state;
  }
};

function saveStorege(memory) {
  localStorage.setItem("store", JSON.stringify(memory));
}
