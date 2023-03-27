import axios from "axios";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";

const EditTitleForm = (props) => {
  const { id } = useParams();
  const handleChange = (e) => {
    const title = e.target.value;

    const payload = {
      title: title,
    };

    axios.patch(
      `https://todo.api.devcode.gethired.id/activity-groups/${id}`,
      payload
    );
  };
  return (
    <div>
      <Form onChange={handleChange}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="text" placeholder={props.placeholder} />
        </Form.Group>
      </Form>
    </div>
  );
};

export default EditTitleForm;
