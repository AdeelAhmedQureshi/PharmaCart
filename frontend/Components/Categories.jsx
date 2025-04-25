import "./Categories.css";
export function Categories({ onCategorySelect }) { //onCategorySelect a function call
  return (
    <div className="categories-navbar">
      <div className="categories-buttons">
        {[
          "All",
          "Allergy",
          "Pain Relief",
          "Mental Health",
          "Diabetes",
          "Digestive Health",
          "Vitamins",
          "Heart Health",
          "Skin Care",
          "Cold & Flu",
        ].map((category) => (
          <button
            style={{ cursor: "pointer"}}
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