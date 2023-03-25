import axios from "axios";
import { API } from "../../const/endpoint";

export const getListAction = () => (dispatch) => {
	axios
		.get(API.GetAllList)
		.then((res) => {
			dispatch({
				type: "GET_ALL_LIST",
				payload: res.data.data,
			});
			console.log("data axios", res.data);
		})
		.catch((err) => console.log("gagal mendapatkan data"));
};
