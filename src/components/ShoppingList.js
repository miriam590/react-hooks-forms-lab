import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  const handleSearchChange = (searchText) => {
    setSearchText(searchText);
    filterItems(searchText, selectedCategory);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterItems(searchText, category);
  };

  const filterItems = (searchText, category) => {
    let filtered = items.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    if (category !== "All") {
      filtered = filtered.filter((item) => item.category === category);
    }

    setFilteredItems(filtered);
  };

  const handleItemFormSubmit = (newItem) => {
    setFilteredItems([...filteredItems, newItem]);
  };

  return (
    <div>
      <Filter onSearchChange={handleSearchChange} onCategoryChange={handleCategoryChange} />
      <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <ul>
        {filteredItems.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;