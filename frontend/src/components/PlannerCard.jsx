function PlannerCard({ title, description, onClick }) {
  return (
    <div className="feature-card" onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default PlannerCard;