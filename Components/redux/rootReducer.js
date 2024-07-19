import { combineReducers } from "redux";

import cartReducer from "./reducer";

const rootReducer = combineReducers({
    cart: cartReducer,
})

export default rootReducer;