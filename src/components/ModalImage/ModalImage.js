import React from 'react';

import './ModalImage.css';

const ModalImage = ({ src, alt, exitModal }) => {
  
  return (
    <div className="ModalImage" onClick={exitModal}>
      <img className="ModalImage__img" src={src} alt={alt} />
    </div>
  );
}

export default ModalImage;