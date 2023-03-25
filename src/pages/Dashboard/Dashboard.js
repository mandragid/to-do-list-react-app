import Header from "../../components/Header";
import "../../components/css/Dashboard.css";
import EmptyState from "../../components/EmptyState";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import rootReducers from "../../redux/reducers";
import getListReducer from "../../redux/reducers/getListReducer";
import { getListAction } from "../../redux/actions/getListAction";
import { Container } from "react-bootstrap";

const Dashboard = () => {
	const { dataList } = useSelector((rootReducers) => rootReducers);

	const dispatch = useDispatch();
	console.log("data list", dataList);

	const getListData = () => {
		dispatch(getListAction());
	};

	useEffect(() => {
		getListData();
	}, []);

	return (
		<div data-cy="dashboard-empty-state" className="container-fluid">
			<Header />
			<div className="dashboard-header">
				<div className="container">
					<div className="row">
						<div data-cy="activity-title" className="col-6 activity-title">
							<h1 data-cy="activity-title">Activity</h1>
						</div>
						<div data-cy="activity-add-button" className="col activity-add-button">
							<button onClick={getListData}>
								<span>
									<i class="bi bi-plus"></i>
								</span>
								<h1>Tambah</h1>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="activity-item-container">
					{dataList.getList.length ? (
						dataList.getList.map((item) => {
							return (
								<div className="card-container">
									<div className="row">
										<div className="col-12">
											<h1>{item.title}</h1>
										</div>
									</div>
									<div className="row">
										<div className="col">
											<h1>{item.created_at.substr(0, 10)}</h1>
										</div>
										<div className="col-1">
											<i class="bi bi-trash3"></i>
										</div>
									</div>
								</div>
							);
						})
					) : (
						<EmptyState />
					)}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
