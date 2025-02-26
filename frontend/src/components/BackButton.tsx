const BackButton = () => {
  return (
    <div className="backButton">
      <button
        onClick={() =>
          (window.location.href = "http://localhost:5173/recipes/")
        }
      >
        Get back
      </button>
    </div>
  );
};

export default BackButton;
