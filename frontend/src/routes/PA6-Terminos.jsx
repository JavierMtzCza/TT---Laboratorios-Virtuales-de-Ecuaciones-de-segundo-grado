import React from 'react';
import { Container, Segment, Header, Checkbox, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  return (
    <div
      style={{
        backgroundImage: 'linear-gradient(to right, #a2c1df, #d2e7fe)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
    <Container text>
      <Segment style={{ backgroundColor: '#fff', padding: '20px' }}>
        <Header as="h1" textAlign="center" style={{ color: '#333' }}>
          Términos y Condiciones de Uso
        </Header>

        <ol >
          <li>
          <a href="#objeto-ambito" style={{ color: '#007bff', textDecoration: 'underline' }}> Objeto y ámbito de aplicación</a>
          </li>
          <li>
            <a href="#aceptacion"   style={{ color: '#007bff', textDecoration: 'underline' }}>  Aceptación de los Términos y Condiciones</a>
          </li>
          <li>
            <a href="#Usuarios" style={{ color: '#007bff', textDecoration: 'underline' }}> Usuarios</a>
          </li>
          <li>
            <a href="#Información-personal" style={{ color: '#007bff', textDecoration: 'underline' }}> Información personal </a>
          </li>
          <li>
            <a href="#Contenido-Aplicacion" style={{ color: '#007bff', textDecoration: 'underline' }}> Contenido de la Aplicación</a>
          </li>
          <li>
            <a href="#Uso-Aplicacion" style={{ color: '#007bff', textDecoration: 'underline' }}> Uso de la Aplicación </a>
          </li>
          <li>
            <a href="#Propiedad-intelectual"  style={{ color: '#007bff', textDecoration: 'underline' }}> Propiedad intelectual </a>
          </li>
          <li>
            <a href="#Exclusion-responsabilidad"  style={{ color: '#007bff', textDecoration: 'underline' }}> Exclusión de responsabilidad </a>
          </li>
          <li>
            <a href="#Suspension-servicio"  style={{ color: '#007bff', textDecoration: 'underline' }}> Suspensión o terminación del servicio </a>
          </li>
          <li>
            <a href="#Ley-aplicable"  style={{ color: '#007bff', textDecoration: 'underline' }}> Ley aplicable</a>
          </li>
          <li>
            <a href="#CambiosyCondiciones"  style={{ color: '#007bff', textDecoration: 'underline' }}> Cambios a los Términos y Condiciones</a>
          </li>
          <li>
            <a href="#Vigencia" style={{ color: '#007bff', textDecoration: 'underline' }}> Vigencia</a>
          </li>
          <li>
            <a href="#Politica-privacidad"  style={{ color: '#007bff', textDecoration: 'underline' }}> Política de privacidad</a>
          </li>
          <li>
            <a href="#Politica-autor" style={{ color: '#007bff', textDecoration: 'underline' }}> Política de derechos de autor </a>
          </li>
          <li>
            <a href="#Politica-contenido" style={{ color: '#007bff', textDecoration: 'underline' }}> Política de contenido </a>
          </li>

          {/* Agrega más ítems según sea necesario */}
        </ol>

        <p id="objeto-ambito">
          <strong>1. Objeto y ámbito de aplicación</strong>
        </p>
        <p>
          Los presentes términos y condiciones de uso  regulan el acceso y uso
          de la aplicación web educativa "Chicharronera Lab" una aplicación desarrollada por estudiantes del Intituto Politecnico Nacional
           ,la cual es propiedad de la escuela Superior de Computo "ESCOM".
        </p>

        <p id="aceptacion">
          <strong>2. Aceptación de los Términos y Condiciones</strong>
        </p>
        <p>
          El acceso y uso de la Aplicación implica la aceptación de los presentes Términos y Condiciones por parte del
          usuario, quien declara haber leído y entendido los mismos.
        </p>
        <p id="Usuarios">
          <strong> 3. Usuarios </strong>
        </p>
        <p>
        La Aplicación está dirigida a alumnos y profesores de 3ro de secundaria en México.
        </p>

        <p id="Información-personal">
          <strong>4. Información personal</strong>
        </p>
        <p>
        La Aplicación recopila información personal de los usuarios, como su nombre, apellidos y correo electrónico, el cual deberá ser consentido por el titular 
        o el padre y madre del alumno para que haga uso de la aplicación. 
        Esta información se utilizará para proporcionar los servicios de la Aplicación y para fines estadísticos .
        </p>

        <p id="Contenido-Aplicacion">
          <strong>5. Contenido de la Aplicación</strong>
        </p>
        <p>
        La Aplicación contiene contenido educativo, como  videos, cuestionarios e imágenes .
        Este contenido es propiedad de la Escuela Superior de Computo o de sus respectivos titulares de derechos.
        </p>

        <p id="Uso-Aplicacion">
          <strong>6. Uso de la Aplicación</strong>
        </p>
        <p>
        El usuario se compromete a utilizar la Aplicación de forma adecuada, conforme a las leyes y reglamentos aplicables. El usuario no podrá:

          Utilizar la Aplicación para fines ilegales o que violen los derechos de terceros.
          Utilizar la Aplicación para difundir contenido que sea ilegal, dañino, amenazante, 
          abusivo, difamatorio, obsceno, o que de cualquier forma viole los reglamentos o leyes mexicanas .
          Utilizar la Aplicación para enviar spam o correo electrónico no solicitado.
          Utilizar la Aplicación para crear cuestionarios o subir imágenes que sean ilegales, 
          dañinos, amenazantes, abusivos, difamatorios, obscenos, o que de cualquier forma violen las leyes o los reglamentos aplicables.
        </p>

        <p id="Propiedad-intelectual">
          <strong> 7. Propiedad intelectual </strong>
        </p>
        <p>
        El software y el contenido de la Aplicación son propiedad de la Escuela Superior de Cómputo "ESCOM" o de sus respectivos titulares de derechos. 
        El usuario no podrá copiar, distribuir, modificar o crear trabajos derivados del software o el contenido de la Aplicación
         sin el consentimiento previo por escrito.
        </p>

        <p id="Exclusion-responsabilidad">
          <strong>8. Exclusión de responsabilidad</strong>
        </p>
        <p>
        La Escuela Superior de Computo "ESCOM" no será responsable por daños directos, indirectos, incidentales, especiales o consecuentes,
        derivados del uso o la irresponsabilidad que se le de la Aplicación.
        </p>

        <p id="Suspension-servicio">
          <strong> 9. Suspensión o terminación del servicio</strong>
        </p>
        <p>
        La Escuela Superior de Computo "ESCOM" se reserva el derecho a suspender o terminar el acceso a la Aplicación
         en cualquier momento, sin previo aviso.
        </p>

        <p id="Ley-aplicable">
          <strong>10. Ley aplicable</strong>
        </p>
        <p>
        Los presentes Términos y Condiciones se rigen por las leyes de los Estados Unidos Mexicanos.
        </p>

        <p id="CambiosyCondiciones">
          <strong>11. Cambios a los Términos y Condiciones</strong>
        </p>
        <p>
        La Escuela Superior de Computo "ESCOM" se reserva el derecho a modificar los presentes 
        Términos y Condiciones en cualquier momento. Las modificaciones se publicarán en la Aplicación y entrarán en vigor a partir de su publicación.
        </p>

        <p id="Vigencia">
          <strong> 12. Vigencia</strong>
        </p>
        <p>
        Los presentes Términos y Condiciones estarán vigentes hasta que sean modificados o sustituidos por otros.
        </p>

        <p id="Politica-privacidad">
          <strong>13. Política de privacidad</strong>
        </p>
        <p>
        La Escuela Superior de Computo "ESCOM" se compromete a proteger la privacidad de los usuarios de la Aplicación. 
        La información personal recopilada por la Aplicación se utilizará únicamente para proporcionar los servicios de 
        la Aplicación y para fines estadísticos .
        La Escuela Superior de Computo "ESCOM" no compartirá la información personal de los usuarios con terceros sin su consentimiento previo.
        </p>

        <p id="Politica-autor">
          <strong>14. Política de derechos de autor</strong>
        </p>
        <p>
        El contenido de la Aplicación está protegido por derechos de autor. El usuario no podrá copiar, distribuir,
         modificar o crear trabajos derivados del contenido de la Aplicación sin el consentimiento previo por escrito de .
        </p>

        <p id="Politica-contenido">
          <strong>15. Política de contenido</strong>
        </p>
        <p>
        El usuario se compromete a utilizar la Aplicación de forma adecuada, conforme a las leyes y reglamentos aplicables.
        </p>



        {/* Agrega el resto de los términos y condiciones aquí */}

        {/* <Checkbox label="Acepto los términos y condiciones" style={{ marginBottom: '15px' }} />
        
          <Button primary as={Link} to="/">
            Aceptar
          </Button> */}
      </Segment>
    </Container>
    </div>
  );
};

export default TermsAndConditions;
