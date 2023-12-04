import React from 'react';

const PdfViewer = () => {
  return (
    <div>
      <iframe
        src="/src/images/prueba.pdf"  // poner ruta del pdf 
        width="100%"
        height="700px"
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default PdfViewer;