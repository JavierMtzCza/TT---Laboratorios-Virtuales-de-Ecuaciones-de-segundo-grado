import React from 'react';

const PdfViewer = ({ruta}) => {
  return (
    <div>
      <iframe
        src={ruta} // poner ruta del pdf 
        width="100%"
        height="500px"
        style={{ border: 'none' }}
        type="application/pdf"
      />
    </div>
  );
};

export default PdfViewer;