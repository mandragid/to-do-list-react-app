import EmptyStateImg from "../assets/img/activity-empty-state.png";

const EmptyState = (props) => {
  const handleAdd = props.handleAdd;

  return (
    <div
      data-cy="activity-empty-state"
      className="row justify-content-center mt-5"
    >
      <img onClick={handleAdd} src={EmptyStateImg} alt="activity-empty-state" />
    </div>
  );
};

export default EmptyState;
