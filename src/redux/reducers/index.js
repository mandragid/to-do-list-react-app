import { combineReducers } from "redux";
import getListReducer from "./getListReducer";

const rootReducers = combineReducers({
	dataList: getListReducer,
});

export default rootReducers;
