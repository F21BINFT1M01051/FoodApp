const initialState = {
    items: []
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'Add':
        const incItemId = action.data.id;
        const itemExists = state.items.find(item => item.id === incItemId);
        if (itemExists) {
          return {
            ...state,
            items: state.items.map(item =>
              item.id === incItemId ? { ...item, quantity: item.quantity + 1 } : item
            )
          };
        } else {
          return {
            ...state,
            items: [...state.items, { ...action.data, quantity: 1 }]
          };
        }
  
      case 'Remove':
        const decItemId = action.data.id;
        return {
          ...state,
          items: state.items.map(item =>
            item.id === decItemId ? { ...item, quantity: item.quantity - 1 } : item
          ).filter(item => item.quantity > 0) // Remove item if quantity drops to zero
        };
  
      case 'Empty':
        return {
          ...state,
          items: []
        };
  
      default:
        return state;
    }
  };
  
  export default cartReducer;
  