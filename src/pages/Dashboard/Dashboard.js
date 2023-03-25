import Header from "../../components/Header";
import "../../components/css/Dashboard.css";
import EmptyState from "../../components/EmptyState";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListAction } from "../../redux/actions/getListAction";
import ModalDeleteIcon from "../../assets/img/modal-delete-icon.png";
import ModalDeleteTitle from "../../assets/img/modal-delete-title.png";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const Dashboard = () => {
	const { dataList } = useSelector((rootReducers) => rootReducers);

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const dispatch = useDispatch();
	console.log("data list", dataList);

	const getListData = () => {
		dispatch(getListAction());
	};

	useEffect(() => {
		getListData();
	}, []);

	const handleDelete = async (id) => {
		await axios.delete(`https://todo.api.devcode.gethired.id/activity-groups/${id}`).then((res) => {
			console.log("delete berhasil");
		});
		getListData();
	};

	return (
		<div data-cy="dashboard-empty-state" className="container-fluid">
			<Header />
			<div className="container d-flex justify-content-around">
				<div data-cy="activity-title" className="activity-title">
					<h1 data-cy="activity-title">Activity</h1>
				</div>
				<div data-cy="activity-add-button" className="activity-add-button">
					<button onClick={getListData}>
						<span>
							<i class="bi bi-plus"></i>
						</span>
						<h1>Tambah</h1>
					</button>
				</div>
			</div>
			<div className="container d-flex justify-content-around">
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
											<button onClick={handleShow}>
												<i class="bi bi-trash3"></i>
											</button>
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

			{/* modal */}
			<Modal show={show} onHide={handleClose}>
				<div data-cy="delete-activity" className="delete-activity">
					<div className="image-container">
						<img className="ModalDeleteIcon" src={ModalDeleteIcon} alt="ModalDeleteIcon" />
					</div>
					<div className="title-container">
						<img className="ModalDeleteTitle" src={ModalDeleteTitle} alt="" />
					</div>
					<div className="button-container">
						<Button variant="secondary">Batal</Button> <Button variant="danger">Hapus</Button>{" "}
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default Dashboard;
