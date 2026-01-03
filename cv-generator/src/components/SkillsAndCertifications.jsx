import dropDownOpenIcon from "../assets/up.svg";
import dropDownCloseIcon from "../assets/down.svg";
import { EditableBulletItem } from "./Input";
import { useState } from "react";

function DropDownIcon({ isOpen }) {
  if (!isOpen) {
    return <img src={dropDownCloseIcon} alt="open drop down list" />;
  }
  return <img src={dropDownOpenIcon} alt="close drop down list" />;
}

function CategoryButton({ label, items, addItems, deleteItems }) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleClickDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  return (
    <div className="category-button">
      <div className="category-button-header" onClick={handleClickDropDown}>
        <h3>{label}</h3>
        <DropDownIcon isOpen={isDropDownOpen} />
      </div>
      <DropDown
        isOpen={isDropDownOpen}
        label={label}
        items={items}
        addItems={addItems}
        deleteItems={deleteItems}
      />
    </div>
  );
}

function DropDown({ isOpen, label, items, addItems, deleteItems }) {
  if (!isOpen) return null;
  return (
    <div className="drop-down-container">
      <div className="drop-down-list">
        {items.map((item) => (
          <EditableBulletItem
            key={`${item}`}
            id={`${item}`}
            label={label}
            placeholder={`Write Your ${label}`}
            onDelete={() => deleteItems(item)}
          />
        ))}

        <button
          className="add-skills-details"
          onClick={addItems}
        >{`Add ${label}`}</button>
      </div>
    </div>
  );
}

function addDetails({ label }) {
  return;
}

export function SkillsAndCertifications() {
  const categories = ["Skills", "Technology", "Languages", "Certificates"];
  const [categoryData, setCategoryData] = useState({
    Skills: [],
    Technology: [],
    Languages: [],
    Certificates: [],
  });

  const addCategoryItem = (category) => {
    setCategoryData((prev) => ({
      ...prev,
      [category]: [...prev[category], `${category}-${Date.now()}`],
    }));
  };

  const removeCategoryItem = (delId, category) => {
    setCategoryData((prev) => ({
      ...prev,
      [category]: prev[category].filter((id) => id !== delId),
    }));
  };

  return (
    <section className="skills">
      {categories.map((category) => (
        <CategoryButton
          key={category}
          label={category}
          items={categoryData[category]}
          addItems={() => addCategoryItem(category)}
          deleteItems={(id) => removeCategoryItem(id, category)}
        />
      ))}
    </section>
  );
}
