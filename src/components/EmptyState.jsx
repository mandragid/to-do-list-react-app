import EmptyStateImg from "../assets/img/activity-empty-state.png";

const EmptyState = () => {
	return (
		<div data-cy="activity-empty-state" className="row justify-content-center mt-5">
			<img src={EmptyStateImg} alt="activity-empty-state" />
		</div>
	);
};

export default EmptyState;
