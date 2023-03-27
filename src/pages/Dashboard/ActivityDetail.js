import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import EditIcon from "../../assets/img/todo-title-edit-button.png";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import BackIcon from "../../assets/img/todo-back-button.png";
import ToDoIcon from "../../assets/img/todo-empty-state.png";
import EditTitleForm from "../../components/EditTitleForm";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../Dashboard/ActivityDetail.css";
import Form from "react-bootstrap/Form";
import { API } from "../../const/endpoint";
import ModalDeleteIcon from "../../assets/img/modal-delete-icon.png";

const ActivityDetail = () => {
  const { id } = useParams();
  console.log("ID aktifitas", id);
  const [activityDetail, setActivityDetail] = useState([]);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  const [name, setName] = useState("");
  const [priority, setPriority] = useState("");
  const [itemList, setItemList] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [listId, setListId] = useState(0);
  const [addListStatus, setAddListStatus] = useState(false);

  console.log("itemlist", itemList);

  const handleEditClick = () => {
    setIsEditClicked(!isEditClicked);
  };

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
    await setAddListStatus(true);
    getDetailedData();
  };

  useEffect(() => {
    getDetailedData();
  }, [addListStatus]);

  const getDetailedData = () => {
    axios
      .get(`https://todo.api.devcode.gethired.id/activity-groups/${id}`)
      .then((res) => {
        setActivityDetail(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    axios
      .get(
        `https://todo.api.devcode.gethired.id/todo-items?activity_group_id=${id}`
      )
      .then((res) => {
        setItemList(res.data.data);
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
                  <div
                    data-cy="activity-title"
                    className="activity-title d-flex flex-wrap align-items-center"
                  >
                    <div className="activity-back-button">
                      <Link to="/">
                        <img src={BackIcon} alt="back-icon" />
                      </Link>
                    </div>
                    <h3 data-cy="activity-title">
                      <EditTitleForm placeholder={activityDetail.title} />
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
                  <div
                    data-cy="activity-title"
                    className="activity-title d-flex flex-wrap align-items-center"
                  >
                    <div className="activity-back-button">
                      <Link to="/">
                        <img src={BackIcon} alt="back-icon" />
                      </Link>
                    </div>
                    <h3 data-cy="activity-title">{activityDetail.title}</h3>
                    <div className="activity-edit-button">
                      <div>
                        <button
                          data-cy="todo-title-edit-button"
                          onClick={handleEditClick}
                        >
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
                <DropdownButton
                  data-cy="todo-sort-button"
                  id="dropdown-custom-button"
                  title=""
                >
                  <Dropdown.Item href="#/action-1">Terbaru</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Terlama</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">A-Z</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Z-A</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Belum Selesai</Dropdown.Item>
                </DropdownButton>
              </div>
              <div className="activity-add-button">
                <div className="activity-add-button">
                  <button data-cy="todo-add-button" onClick={handleShow}>
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
                  <div
                    data-cy="todo-item"
                    className="list-container d-flex p-3"
                  >
                    <div className="left-section-list d-flex justify-content-start align-items-center ">
                      <div className="checkbox">
                        <Form data-cy="todo-item-checkbox">
                          {["checkbox"].map((type) => (
                            <div key={`default-${type}`} className="mb-3">
                              <Form.Check type={type} id={`default-${type}`} />
                            </div>
                          ))}
                        </Form>
                      </div>
                      <div
                        data-cy="todo-item-priority-indicator"
                        className={item.priority}
                        id="category"
                      ></div>
                      <div className="list-name">
                        <p data-cy="todo-item-title">{item.title}</p>
                      </div>
                      <div className="list-edit-button">
                        <button
                          data-cy="todo-item-edit-button"
                          onClick={() => handleShowEdit(item.id, item.title)}
                        >
                          <img src={EditIcon} alt="edit-icon"></img>
                        </button>
                      </div>
                    </div>
                    <div className="right-section-list d-flex justify-content-end align-items-center ">
                      <button
                        data-cy="todo-item-delete-button"
                        onClick={() => handleDeleteShow(item.id, item.title)}
                        href=""
                      >
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
            <img
              className="ModalDeleteIcon"
              src={ModalDeleteIcon}
              alt="ModalDeleteIcon"
            />
          </div>
          <div className="title-container">
            <h1>Apakah anda yakin menghapus activity “{selectedItem}”?</h1>
          </div>
          <div className="button-container">
            <Button onClick={handleClose} variant="secondary">
              Batal
            </Button>{" "}
            <Button onClick={() => handleDeleteList(listId)} variant="danger">
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
                <Form.Control
                  type="text"
                  placeholder="Tambahkan nama activity"
                />
              </Form.Group>
            </Form>
            <span>
              <p data-cy="modal-add-priority-title">Priority</p>
              <Form.Select
                onChange={handlePriority}
                aria-label="Default select example"
              >
                <option>Select Priority</option>
                <option value="very-high">Very High</option>
                <option value="high">High</option>
                <option value="normal">Medium</option>
                <option value="low">Low</option>
                <option value="very-low">Very Low</option>
              </Form.Select>
            </span>
          </div>
          <div className="add-item-modal-button mt-3 d-flex justify-content-end">
            <Button
              data-cy="modal-add-save-button"
              onClick={handleAddList}
              variant="primary"
            >
              Simpan
            </Button>
          </div>
        </div>
      </Modal>
      {/* end of modal add */}

      {/* modal edit list */}
      <Modal data-cy="modal-information" show={showEdit} onHide={handleClose}>
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
              <Form.Select
                onChange={handlePriority}
                aria-label="Default select example"
              >
                <option>Select Priority</option>
                <option value="very-high">Very High</option>
                <option value="high">High</option>
                <option value="normal">Medium</option>
                <option value="low">Low</option>
                <option value="very-low">Very Low</option>
              </Form.Select>
            </span>
          </div>
          <div className="add-item-modal-button mt-3 d-flex justify-content-end">
            <Button onClick={() => handleEditList(listId)} variant="primary">
              Simpan
            </Button>
          </div>
        </div>
      </Modal>
      {/* end of modal edit list  */}
    </div>
  );
};

export default ActivityDetail;
