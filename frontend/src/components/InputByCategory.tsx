const InputByCategory = () => {
  return (
    <div>
      <h3>Search by category</h3>
      <input
        type="text"
        onBlur={(e) => {
          if (e.target.value !== "") {
            window.location.href = `http://localhost:5173/recipes?filterType=category&filterValue=${e.target.value}`;
          }
        }}
      />
    </div>
  );
};

export default InputByCategory;
