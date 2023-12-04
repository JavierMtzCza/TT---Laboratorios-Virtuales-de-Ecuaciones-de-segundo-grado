// src/components/ListaPreguntas.js
/*
import React, { useEffect, useState } from 'react';

const ListaPreguntas = () => {
  const [preguntas, setPreguntas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/preguntacues');
        if (response.ok) {
          const data = await response.json();
          setPreguntas(data);
        } else {
          console.error('Error al obtener las preguntas de cuestionario');
          // Manejar errores
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        // Manejar errores
      }
    };

    fetchData();
  }, []);

  return (
    // Renderizar la lista de preguntas
  );
};

export default ListaPreguntas;
*/