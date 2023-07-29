import { useNavigate } from "react-router-dom";
import { categories } from "../../backend/categories";
import { SideNav } from "../../components/sideNav/sideNav";
import "../homePage/homePage.css";

export const HomePage = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/listing/${category}`);
  };

  return (
    <div className="homepage-main-container">
      <div>
        <SideNav />
      </div>
      <div className="homepage-container">
        <div className="category-header">Categories</div>
        <div className="categories-layout">
          {categories.map((category) => (
            <div
              className="category-card"
              onClick={() => handleCategoryClick(category.category)}
              key={category.id}
            >
              <div>
                <img
                  src={category.thumbnail}
                  alt="loading"
                  className="category-thumbnail"
                />
              </div>
              <div className="category-title">{category.category}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
