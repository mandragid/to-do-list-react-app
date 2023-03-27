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

const ActivityDetail = () => {
  const { id } = useParams();
  const [activityDetail, setActivityDetail] = useState([]);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("");

  const handleEditClick = () => {
    setIsEditClicked(!isEditClicked);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleAddName = (e) => {
    setName(e.target.value);
  };

  const handlePriority = (e) => {
    setPriority(e.target.value);
  };

  const handleAddList = () => {
    // const formData = new FormData();
    // formData.append("title", name);
    // formData.append("priority", priority);
    // formData.append("activity_group_id", id);

    const payload = {
      title: name,
      activity_group_id: id,
      priority: priority,
    };

    axios.post(API.AddListActivity, payload).then((res) => {
      console.log("post list succeeded");
    });
  };

  useEffect(() => {
    axios
      .get(`https://todo.api.devcode.gethired.id/activity-groups/${id}`)
      .then((res) => {
        setActivityDetail(res.data);
      });
  }, []);

  return (
    <div className="container-fluid">
      <Header />
      <div className="container">
        <div className="container d-flex justify-content-center">
          <div className="row w-100 align-items-center">
            <div className="col-1">
              <Link to="/">
                <img src={BackIcon} alt="back-icon" />
              </Link>
            </div>
            <div className="col-3">
              {isEditClicked ? (
                <EditTitleForm placeholder={activityDetail.title} />
              ) : (
                <div data-cy="activity-title" className="activity-title">
                  <h3 data-cy="activity-title">{activityDetail.title}</h3>
                </div>
              )}
            </div>
            <div className="col-1">
              <div>
                <button onClick={handleEditClick}>
                  <img src={EditIcon} alt="edit-icon"></img>
                </button>
              </div>
            </div>
            <div className="col-1">
              <DropdownButton id="dropdown-basic-button" title="">
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>
            </div>
            <div className="col">
              <div
                data-cy="activity-add-button"
                className="activity-add-button"
              >
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
        <div className="container d-flex justify-content-center">
          <div>
            <img src={ToDoIcon} alt="to-do-icon" />
          </div>
        </div>
      </div>
      {/* modal */}
      <Modal show={show} onHide={handleClose}>
        <div data-cy="tambah-list-item" className="add-item-modal">
          <div className="add-item-modal-header">
            <span>
              <p>Tambah List Item</p>
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
                <Form.Label>NAMA LIST ITEM</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tambahkan nama activity"
                />
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
            <Button onClick={handleAddList} variant="primary">
              Simpan
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ActivityDetail;
