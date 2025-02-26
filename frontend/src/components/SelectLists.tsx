import axios from "axios";
import { useState, useEffect } from "react";

export const SelectLists = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:4444/listData")
      .then((response) => {
        console.log(response);
        setCategories(
          response.data.categories.map(
            (item: { strCategory: string }) => item.strCategory,
          ),
        );
        console.log(categories);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch categories");
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <select
        name="1"
        id=""
      >
        <option
          value=""
          disabled
        >
          Category
        </option>
        {categories.map((category: string, index: number) => (
          <option
            key={index}
            value={category}
          >
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};
