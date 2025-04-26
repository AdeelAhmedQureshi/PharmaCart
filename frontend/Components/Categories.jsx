import "./Categories.css";
export function Categories({ onCategorySelect, selectedCategory }) { //onCategorySelect a function call
  return (
    <div className="categories-navbar">
      <div className="categories-buttons">
        {[
          "All",
          "Allergy",
          "Pain Relief",
          "Mental Health",
          "Diabetes",
          "Digestive",
          "Vitamins",
          "Heart Health",
          "Skin Care",
          "Cold & Flu",
        ].map((category) => (
          <button
            style={{ 
              cursor: "pointer",
              backgroundColor: selectedCategory === category ? "#077A7D" : "",
              color: selectedCategory === category ? "white" : "",
              borderRadius: "5px",
              width: "105px",
              height: "35px",
            }}
            value={category}
            key={category}
            onClick={(e) => onCategorySelect(e.target.value)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}