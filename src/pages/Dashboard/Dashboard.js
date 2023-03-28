import Header from "../../components/Header";
import "../../components/css/Dashboard.css";
import EmptyState from "../../components/EmptyState";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListAction } from "../../redux/actions/getListAction";
import ModalDeleteIcon from "../../assets/img/modal-delete-icon.png";
import ModalDeleteSuccessIcon from "../../assets/img/modal-information-icon.png";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { API } from "../../const/endpoint";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
	const { dataList } = useSelector((rootReducers) => rootReducers);
	const [id, setId] = useState(0);

	console.log(id);
	const [show, setShow] = useState(false);
	const [showSuccessAlert, setShowSuccessAlert] = useState(false);
	const handleClose = () => {
		setShow(false);
		setShowSuccessAlert(false);
	};
	const [selectedItem, setSelectedItem] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	console.log(selectedItem);

	const handleShow = (id, judul) => {
		setId(id);
		setShow(true);
		setSelectedItem(judul);
	};

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
		await setShow(false);
		await setId(null);
		await setShowSuccessAlert(!showSuccessAlert);

		getListData();
	};

	const handleAdd = async () => {
		const payload = {
			title: "New Activity",
			email: "andreivanp@gmail.com",
		};
		await axios
			.post(API.AddList, payload)
			.then((res) => {
				console.log("tambah berhasil");
			})
			.catch((err) => {
				console.log(err.message);
			});
		getListData();
	};

	const handleActivityDetail = () => {
		navigate(`/detail/${id}`);
	};

	return (
		<div data-cy="dashboard-empty-state" className="container-fluid">
			<Header />
			<div className="container d-flex justify-content-around">
				<div data-cy="activity-title" className="activity-title">
					<h1 data-cy="activity-title">Activity</h1>
				</div>
				<div className="activity-add-button">
					<Button data-cy="activity-add-button" onClick={handleAdd}>
						<span>
							<i class="bi bi-plus"></i>
						</span>
						<h1>Tambah</h1>
					</Button>
				</div>
			</div>
			<div className="container d-flex justify-content-around">
				<div className="activity-item-container">
					{dataList.getList.length ? (
						dataList.getList.map((item) => {
							return (
								<div className="card-container">
									<Link data-cy="activity-item" to={`/detail/${item.id}`}>
										<div className="row">
											<div className="col-12">
												<h1 data-cy="activity-item-title">{item.title}</h1>
											</div>
										</div>
									</Link>
									<div className="row">
										<div className="col">
											<h1 data-cy="activity-item-date">{item.created_at.substr(0, 10)}</h1>
										</div>
										<div className="col-1">
											<button
												data-cy="modal-delete"
												onClick={() => {
													handleShow(item.id, item.title);
												}}
											>
												<i class="bi bi-trash3"></i>
											</button>
										</div>
									</div>
								</div>
							);
						})
					) : (
						<EmptyState handleAdd={handleAdd} />
					)}
				</div>
			</div>

			{/* Delete modal */}
			<Modal show={show} onHide={handleClose}>
				<div data-cy="todo-modal-delete" className="delete-activity">
					<div className="image-container">
						<img data-cy="modal-delete-icon" className="ModalDeleteIcon" src={ModalDeleteIcon} alt="ModalDeleteIcon" />
					</div>
					<div className="title-container">
						<h1>Apakah anda yakin menghapus activity “{selectedItem}”?</h1>
					</div>
					<div className="button-container">
						<Button data-cy="modal-delete-cancel-button" onClick={handleClose} variant="secondary">
							Batal
						</Button>{" "}
						<Button data-cy="activity-item-delete-button" onClick={() => handleDelete(id)} variant="danger">
							Hapus
						</Button>{" "}
					</div>
				</div>
			</Modal>
			{/* end of delete modal */}

			{/* Delete success modal */}
			<Modal show={showSuccessAlert} onHide={handleClose}>
				<div data-cy="modal-information" className="modal-delete-success d-flex justify-content-center align-items-center p-3">
					<div data-cy="modal-information-icon" className="modal-delete-success-image">
						<img className="ModalDeleteIcon" src={ModalDeleteSuccessIcon} alt="ModalDeleteIcon" />
					</div>
					<div className="modal-delete-success-title">
						<p data-cy="modal-information-title">“{selectedItem}” berhasil dihapus.</p>
					</div>
				</div>
			</Modal>
			{/* Delete success modal */}
		</div>
	);
};

export default Dashboard;
