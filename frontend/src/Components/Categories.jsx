export function Categories({ onCategorySelect, selectedCategory }) {
  return (
    <div className="categories-navbar" style={{ 
      padding: "10px", 
      backgroundColor: "#f8f9fa", 
      borderBottom: "1px solid #dee2e6" 
    }}>
      <div className="categories-buttons" style={{ 
        display: "flex", 
        gap: "10px", 
        flexWrap: "wrap", 
        justifyContent: "center" 
      }}>
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
              backgroundColor: selectedCategory === category ? "#007BFF" : "#ffffff",
              color: selectedCategory === category ? "#ffffff" : "#007BFF",
              border: "1px solid #007BFF",
              borderRadius: "20px",
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: "500",
              transition: "all 0.2s ease",
              transform: "translateY(0)",
              boxShadow: selectedCategory === category 
                ? "0px 4px 6px rgba(0, 123, 255, 0.2)" 
                : "0px 2px 4px rgba(0, 0, 0, 0.05)",
            }}
            value={category}
            key={category}
            onClick={(e) => onCategorySelect(e.target.value)}
            onMouseEnter={(e) => {
              if (selectedCategory !== category) {
                e.target.style.backgroundColor = "#e7f1ff";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0px 4px 8px rgba(0, 123, 255, 0.2)";
              }
            }}
            onMouseLeave={(e) => {
              if (selectedCategory !== category) {
                e.target.style.backgroundColor = "#ffffff";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.05)";
              }
            }}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}