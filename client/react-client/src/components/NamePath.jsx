import React, { useContext } from 'react';
import { Context } from '../store/context';
import { useNavigate } from 'react-router-dom';
import '../styles/Global.css';

const NamePath = () => {
  const { device } = useContext(Context);
  const navigate = useNavigate();

  const selectedType = device.selectedType;
  const selectedBrandIds = device.selectedBrands;
  const allBrands = device.brands;

  const selectedBrandNames = allBrands.filter((brand) =>
    selectedBrandIds.includes(brand.id)
  );

  const hasType = selectedType?.name;
  const hasBrands = selectedBrandNames.length > 0;

  if (!hasType && !hasBrands) return null; 

  const onHomeClick = () => {
    device.setSelectedType({});
    device.setSelectedBrands([]);
    device.setPriceFilter({ min: null, max: null });
    device.setSortOrder(null)
    device.setPage(1);
    navigate('/');
  };

  const onTypeClick = () => {
    device.setSelectedBrands([]);
    device.setPage(1);
    navigate('/');
    setTimeout(() => {
      device.setSelectedType(selectedType); 
    }, 0);
  };


  return (
    <div className="mb-3">
      <nav className="breadcrumbs">
        <span className="breadcrumb-link" onClick={onHomeClick} style={{ cursor: 'pointer' }}>
          Головна
        </span>

        {hasType && (
          <>
            <span className="breadcrumb-separator">›</span>
            <span
              className="breadcrumb-link"
              onClick={onTypeClick}
              style={{ cursor: 'pointer' }}
            >
              {selectedType.name}
            </span>
          </>
        )}

        {hasBrands && (
          <>
            <span className="breadcrumb-separator">›</span>
            {selectedBrandNames.map((brand, i) => (
              <span key={brand.id}>
                <span>
                  {brand.name}
                </span>
                {i < selectedBrandNames.length - 1 && ', '}
              </span>
            ))}
          </>
        )}
      </nav>

      <h2 className="name-path-heading mt-2">
        {hasType && selectedType.name}
      </h2>
    </div>
  );
};

export default NamePath;
