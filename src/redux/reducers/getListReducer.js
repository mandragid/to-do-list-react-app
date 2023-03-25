const initialState = {
	getList: [],
};

const getListReducer = (state = initialState, action) => {
	switch (action.type) {
		case "GET_ALL_LIST":
			return {
				...initialState,
				getList: action.payload,
			};

		default:
			return state;
	}
};

export default getListReducer;
