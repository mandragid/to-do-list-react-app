import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import EditIcon from "../../assets/img/todo-title-edit-button.png";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import BackIcon from "../../assets/img/todo-back-button.png";
import ToDoIcon from "../../assets/img/todo-empty-state.png";
import ModalDeleteSuccessIcon from "../../assets/img/modal-information-icon.png";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../Dashboard/ActivityDetail.css";
import Form from "react-bootstrap/Form";
import { API } from "../../const/endpoint";
import ModalDeleteIcon from "../../assets/img/modal-delete-icon.png";

const ActivityDetail = () => {
	const { id } = useParams();
	const [activityDetail, setActivityDetail] = useState([]);
	const [isEditClicked, setIsEditClicked] = useState(false);
	const [show, setShow] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [deleteShow, setDeleteShow] = useState(false);
	const [name, setName] = useState("");
	console.log("nama", name);
	const [priority, setPriority] = useState("");
	const [itemList, setItemList] = useState([]);
	const [showDelete, setShowDelete] = useState(false);
	const [selectedItem, setSelectedItem] = useState("");
	const [listId, setListId] = useState(0);
	const [addListStatus, setAddListStatus] = useState(false);
	const [editNameStatus, seteditNameStatus] = useState(false);
	const [isChecked, setIsChecked] = useState(1);
	console.log(isChecked);
	const placeholder = localStorage.getItem("placeholder");
	const [showSuccessAlertItem, setShowSuccessAlertItem] = useState(false);

	const handleDeleteShow = (id, listname) => {
		setListId(id);
		setDeleteShow(true);
		setSelectedItem(listname);
	};

	const handleShowEdit = (id, listname) => {
		setShowEdit(true);
		setListId(id);
		setSelectedItem(listname);
	};

	const handleShow = () => {
		setShow(true);
	};

	const handleClose = () => {
		setShow(false);
		setDeleteShow(false);
		setShowEdit(false);
		setShowSuccessAlertItem(false);
	};

	const handleAddName = (e) => {
		setName(e.target.value);
	};

	const handlePriority = (e) => {
		setPriority(e.target.value);
	};

	const handleEditList = async (id) => {
		const payload = {
			title: name,
			priority: priority,
		};

		await axios
			.patch(`https://todo.api.devcode.gethired.id/todo-items/${id}`, payload)
			.then((res) => {
				console.log("update berhasil");
			})
			.catch((err) => {
				console.log(err.message);
			});
		await setShowEdit(false);

		getDetailedData();
	};

	const handleDeleteList = async (id) => {
		await axios
			.delete(`https://todo.api.devcode.gethired.id/todo-items/${id}`)
			.then((res) => {
				console.log("delete berhasil");
			})
			.catch((err) => {
				console.log(err.message);
			});
		await setShow(false);
		await setDeleteShow(false);
		await setShowSuccessAlertItem(!showSuccessAlertItem);
		getDetailedData();
	};

	const handleAddList = async () => {
		const payload = {
			title: name,
			activity_group_id: id,
			priority: priority,
		};

		axios.post(API.AddListActivity, payload).then((res) => {
			console.log("post list succeeded");
		});

		await setShow(false);
		await setAddListStatus(!addListStatus);
		await setName("");
		getDetailedData();
	};

	const handleChangeName = async (e) => {
		setName(e.target.value);
		localStorage.setItem("placeholder", e.target.value);
	};

	const handleEditClick = async () => {
		await setIsEditClicked(!isEditClicked);
		const payload = {
			title: name,
		};
		axios.patch(`https://todo.api.devcode.gethired.id/activity-groups/${id}`, payload).then((res) => {
			seteditNameStatus(!editNameStatus);
		});
		getDetailedData();
	};

	const handleCheck = async (id) => {
		const payload = {
			is_active: 0,
		};

		await axios.patch(`https://todo.api.devcode.gethired.id/todo-items/${id}`, payload);
		getDetailedData();
	};

	useEffect(() => {
		getDetailedData();
	}, [addListStatus, editNameStatus]);

	const getDetailedData = () => {
		axios
			.get(`https://todo.api.devcode.gethired.id/activity-groups/${id}`)
			.then((res) => {
				setActivityDetail(res.data);
				setName(res.data.title);
			})
			.catch((err) => {
				console.log(err.message);
			});

		axios
			.get(`https://todo.api.devcode.gethired.id/todo-items?activity_group_id=${id}`)
			.then((res) => {
				setItemList(res.data.data);
				setPriority(res.data.data.priority);
				console.log(res);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	return (
		<div className="container-fluid">
			<Header />
			<div className="container">
				<div className="container ">
					<div className="activity-container">
						<div className="">
							{isEditClicked ? (
								<div className="left-section">
									<div data-cy="activity-title" className="activity-title d-flex flex-wrap align-items-center">
										<div className="activity-back-button">
											<Link to="/">
												<img src={BackIcon} alt="back-icon" />
											</Link>
										</div>
										<h3 data-cy="activity-title">
											<div>
												<Form onChange={handleChangeName}>
													<Form.Group className="mb-3" controlId="formBasicEmail">
														<Form.Control type="text" placeholder={name} defaultValue={name} />
													</Form.Group>
												</Form>
											</div>
										</h3>
										<div className="activity-edit-button">
											<div>
												<button onClick={handleEditClick}>
													<img src={EditIcon} alt="edit-icon"></img>
												</button>
											</div>
										</div>
									</div>
								</div>
							) : (
								<div className="left-section">
									<div data-cy="activity-title" className="activity-title d-flex flex-wrap align-items-center">
										<div className="activity-back-button">
											<Link to="/">
												<img src={BackIcon} alt="back-icon" />
											</Link>
										</div>
										<h3 onClick={handleEditClick} data-cy="todo-title">
											{activityDetail.title}
										</h3>
										<div className="activity-edit-button">
											<div>
												<button data-cy="todo-title-edit-button" onClick={handleEditClick}>
													<img src={EditIcon} alt="edit-icon"></img>
												</button>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>

						<div className="right-section d-flex flex-wrap align-items-center">
							<div className="activity-sort-button">
								<DropdownButton data-cy="todo-sort-button" id="dropdown-custom-button" title="">
									<Dropdown.Item data-cy="sort-selection" href="#/action-1">
										Terbaru
									</Dropdown.Item>
									<Dropdown.Item data-cy="sort-selection" href="#/action-2">
										Terlama
									</Dropdown.Item>
									<Dropdown.Item data-cy="sort-selection" href="#/action-3">
										A-Z
									</Dropdown.Item>
									<Dropdown.Item data-cy="sort-selection" href="#/action-3">
										Z-A
									</Dropdown.Item>
									<Dropdown.Item data-cy="sort-selection" href="#/action-3">
										Belum Selesai
									</Dropdown.Item>
								</DropdownButton>
							</div>
							<div className="activity-add-button">
								<div data-cy="todo-add-button" className="activity-add-button">
									<button onClick={handleShow}>
										<span>
											<i class="bi bi-plus"></i>
										</span>
										<h1>Tambah</h1>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container d-flex justify-content-center">
					<div>
						{!!itemList.length ? (
							itemList.map((item) => {
								return (
									<div data-cy="todo-item" className="list-container d-flex p-3">
										<div className="left-section-list d-flex justify-content-start align-items-center ">
											<div data-cy="todo-item-checkbox" className="checkbox">
												<input onChange={() => handleCheck(item.id)} type="checkbox"></input>
											</div>
											<div data-cy="todo-item-priority-indicator" className={item.priority} id="category"></div>
											<div className="list-name">
												<p data-cy="todo-item-title">{item.title}</p>
											</div>
											<div className="list-edit-button">
												<button data-cy="todo-item-edit-button" onClick={() => handleShowEdit(item.id, item.title)}>
													<img src={EditIcon} alt="edit-icon"></img>
												</button>
											</div>
										</div>
										<div className="right-section-list d-flex justify-content-end align-items-center ">
											<button data-cy="todo-item-delete-button" onClick={() => handleDeleteShow(item.id, item.title)} href="">
												<i class="bi bi-trash-fill"></i>
											</button>
										</div>
									</div>
								);
							})
						) : (
							<img data-cy="todo-empty-state" src={ToDoIcon} alt="to-do-icon" />
						)}
					</div>
				</div>
			</div>

			{/* Delete modal */}
			<Modal data-cy="modal-delete" show={deleteShow} onHide={handleClose}>
				<div data-cy="delete-activity" className="delete-activity">
					<div className="image-container">
						<img className="ModalDeleteIcon" src={ModalDeleteIcon} alt="ModalDeleteIcon" />
					</div>
					<div className="title-container">
						<h1>Apakah anda yakin menghapus item “{selectedItem}”?</h1>
					</div>
					<div className="button-container">
						<Button onClick={handleClose} variant="secondary">
							Batal
						</Button>{" "}
						<Button data-cy="modal-delete-confirm-button" onClick={() => handleDeleteList(listId)} variant="danger">
							Hapus
						</Button>{" "}
					</div>
				</div>
			</Modal>
			{/* end of delete modal */}

			{/* modal add */}
			<Modal data-cy="modal-add" show={show} onHide={handleClose}>
				<div data-cy="tambah-list-item" className="add-item-modal">
					<div className="add-item-modal-header">
						<span>
							<p data-cy="modal-add-title">Tambah List Item</p>
						</span>
						<div className="container d-flex justify-content-end">
							<a data-cy="modal-add-close-button" onClick={handleClose}>
								<i class="bi bi-x-lg"></i>
							</a>
						</div>
					</div>
					<div className="add-item-modal-content">
						<Form data-cy="modal-add-name-input" onChange={handleAddName}>
							<Form.Group className="mb-3">
								<Form.Label>
									<p data-cy="modal-add-name-title">NAMA LIST ITEM</p>
								</Form.Label>
								<Form.Control type="text" placeholder="Tambahkan nama activity" />
							</Form.Group>
						</Form>
						<span>
							<p data-cy="modal-add-priority-title">Priority</p>
							<div data-cy="modal-add-priority-dropdown">
								<Form.Select onChange={handlePriority}>
									<option defaultValue={priority} value="very-high">
										<div>
											<span className="span-option" data-cy="modal-add-priority-item">
												Very High
											</span>
										</div>
									</option>
									<option value="high">
										<span className="span-option" data-cy="modal-add-priority-item">
											High
										</span>
									</option>
									<option value="normal">
										<span className="span-option" data-cy="modal-add-priority-item">
											Medium
										</span>
									</option>
									<option value="low">
										<span className="span-option" data-cy="modal-add-priority-item">
											Low
										</span>
									</option>
									<option value="very-low">
										<span className="span-option" data-cy="modal-add-priority-item">
											Very Low
										</span>
									</option>
								</Form.Select>
							</div>
						</span>
					</div>
					<div className="add-item-modal-button mt-3 d-flex justify-content-end">
						{!!name.length ? (
							<Button data-cy="modal-add-save-button" onClick={handleAddList} variant="primary">
								Simpan
							</Button>
						) : (
							<Button data-cy="modal-add-save-button" onClick={handleAddList} variant="primary" disabled>
								Simpan
							</Button>
						)}
					</div>
				</div>
			</Modal>
			{/* end of modal add */}

			{/* modal edit list */}
			<Modal show={showEdit} onHide={handleClose}>
				<div className="add-item-modal">
					<div className="add-item-modal-header">
						<span>
							<p>Edit Item</p>
						</span>
						<div className="container d-flex justify-content-end">
							<a onClick={handleClose}>
								<i class="bi bi-x-lg"></i>
							</a>
						</div>
					</div>
					<div className="add-item-modal-content">
						<Form onChange={handleAddName}>
							<Form.Group className="mb-3">
								<Form.Label>
									<p>NAMA LIST ITEM</p>
								</Form.Label>
								<Form.Control type="text" placeholder={selectedItem} />
							</Form.Group>
						</Form>
						<span>
							<p>Priority</p>
							<Form.Select onChange={handlePriority} aria-label="Default select example">
								<option value="very-high">Very High</option>
								<option value="high">High</option>
								<option value="normal">Medium</option>
								<option value="low">Low</option>
								<option value="very-low">Very Low</option>
							</Form.Select>
						</span>
					</div>
					<div className="add-item-modal-button mt-3 d-flex justify-content-end">
						<button type="button" class="btn btn-lg btn-primary" onClick={() => handleEditList(listId)}>
							Simpan
						</button>
					</div>
				</div>
			</Modal>
			{/* end of modal edit list  */}

			{/* Delete success modal */}
			<Modal show={showSuccessAlertItem} onHide={handleClose}>
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

export default ActivityDetail;
