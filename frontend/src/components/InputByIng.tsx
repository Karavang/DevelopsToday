const InputByIng = () => {
  return (
    <div>
      <h3>Search by ingredient</h3>
      <input
        type="text"
        onBlur={(e) => {
          if (e.target.value !== "") {
            window.location.href = `http://localhost:5173/recipes?filterType=ingredient&filterValue=${e.target.value}`;
          }
        }}
      />
    </div>
  );
};

export default InputByIng;
