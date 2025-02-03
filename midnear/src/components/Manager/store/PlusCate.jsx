import React from 'react';

const PlusCate = ({ onAdd }) => {
  return (
    <div className="pluscate" onClick={onAdd}>
      + 카테고리 추가
    </div>
  );
};

export default PlusCate;
