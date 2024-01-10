import React, { useState } from 'react';
import { Accordion, Container, Segment, Header } from 'semantic-ui-react';

const PA16Ayuda = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: '1.¿Es gratis la aplicación?',
      answer: 'Por supuesto no se hará algun cobro por el uso de la aplicación',
    },
    {
      question: '2.¿Cómo puedo registrarme en la aplicación?',
      answer: 'Puedes registrarte haciendo clic en el botón "Registrarse" en la página de inicio.',
    },
    {
      question: '3.¿Necesito crear una cuenta?',
      answer: 'Si quiere usar todas las funciones de nuestra aplicación , por supuesto debes crear una cuenta.',
    },
    {
      question: '4.¿Es para todas las edades?',
      answer: 'La aplicación esta orientada a jóvenes que cursen el 3er grado de secuendaria, pero claro cualquier persona que desee puede usar la aplicación.',
    },
    {
      question: '5.¿Mis datos están seguros?',
      answer: 'Por supuesto los datos que recolectamos los usamos con fines educativos y estadísticos no lo compartimos con terceros.',
    },
    {
      question: '6.¿La aplicación incluye actividades interactivas ?',
      answer: 'La aplicación muestra de una manera visual de como resolver una ecuación cuadrática pero no proporcionamos actividades pre-cargadas',
    },
    {
      question: '7.¿Se pueden utilizar múltiples perfiles para varios usuarios en la misma aplicación?',
      answer: 'Por supuesto la aplicación es para que puedan usarla varios usuarios a la vez.',
    },
    {
      question: '8.¿Puedo acceder a la aplicación desde diferentes dispositivos?',
      answer: 'Claro que si puede usar su perfil en distintos dispositivos a la vez',
    },
    {
      question: '9.¿La aplicación requiere una conexión a internet constante?',
      answer: 'Si, necesita una conexión a internet en todo momento para hacer uso de la aplicación',
    },
    
    {
      question: '10.¿Existen recursos de apoyo para los usuarios?',
      answer: 'Tenemos un apartado de "Documentación" donde el usuario puede leer el manual de usuario a detalle de como crear "ejercicios", "cuentas", etc.',
    },
    
    {
      question: '11.¿Puedo crear varias cuentas con el mismo correo?',
      answer: 'No, solo se permite crear una única cuenta con un correo electrónico ',
    },

    {
      question: '12.¿Cómo restablecer mi contraseña?',
      answer: 'Ve a la página de inicio de sesión y haz clic en "Olvidé mi contraseña" para restablecerla.',
    },
    

    {
      question: '13.¿Mi cuenta se elimina por inactividad?',
      answer: 'No la cuenta no se elimina si deja de usarla por un tiempo.',
    },
    

    {
      question: '14.¿Puedo estar inscrito en múltiples grupos?',
      answer: 'Si, puede estar inscrito en múltiples grupos al igual que puede crear múltiples grupos',
    },
    
  ];

  return (
    <div
      style={{
        backgroundImage: 'linear-gradient(90deg, rgba(255,251,217,1) 32%, rgba(255,248,185,1) 86%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container text>
        <Segment style={{ backgroundColor: '#fff', padding: '20px' }}>
          <Header as="h1" textAlign="center" style={{ color: '#333' }}>
            Preguntas Frecuentes
          </Header>
          <Accordion fluid styled>
            {faqData.map((faq, index) => (
              <React.Fragment key={index}>
                <Accordion.Title
                  active={activeIndex === index}
                  index={index}
                  onClick={() => handleAccordionClick(index)}
                >
                  <Header as="h3" style={{ color: '#333' }}>
                    {faq.question}
                  </Header>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === index}>
                  <p>{faq.answer}</p>
                </Accordion.Content>
              </React.Fragment>
            ))}
          </Accordion>
        </Segment>
      </Container>
    </div>
  );
};

export default PA16Ayuda;
