import Header from "../../components/Header";
import "../../components/css/Dashboard.css";
import EmptyStateImg from "../../assets/img/activity-empty-state.png";

const Dashboard = () => {
	return (
		<div data-cy="dashboard-empty-state" className="container-fluid">
			<Header />

			<div className=" ">
				<div className="row">
					<div data-cy="activity-title" className="col-6 activity-title">
						<p>Activity</p>
					</div>
					<div data-cy="activity-add-button" className="col-6 activity-add-button">
						<button>
							<p>Tambah</p>
						</button>
					</div>
				</div>
				<div className="row">
					<img src={EmptyStateImg} alt="activity-empty-state" />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
