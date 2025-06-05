import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../store/context";
import '../styles/Global.css'

const BrandBarTop = observer(() => {
  const { device } = useContext(Context);

  if (!device.selectedType?.id) return null;

  const selectedBrandObjects = device.brands.filter((brand) =>
    device.selectedBrands.includes(brand.id)
  );

  return (
    <div className="brand-bar-top-container">
      {selectedBrandObjects.map((brand) => (
        <div
          key={brand.id}
          className="selected-brand"
          onClick={() => device.setSelectedBrands(brand.id)}
        >
          <span>{brand.name}</span>
          <span className="remove-icon">✕</span>
        </div>
      ))}
    </div>
  );
});

export default BrandBarTop;

