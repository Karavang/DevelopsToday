const InputByCountry = () => {
  return (
    <div>
      <h3>Search by country:</h3>
      <input
        type="text"
        onBlur={(e) => {
          if (e.target.value !== "") {
            window.location.href = `http://localhost:5173/recipes?filterType=country&filterValue=${e.target.value}`;
          }
        }}
      />
    </div>
  );
};

export default InputByCountry;
