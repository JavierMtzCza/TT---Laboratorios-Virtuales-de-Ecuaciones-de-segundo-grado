import React from 'react';
import { Container, Segment, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const PA11AvisodePrivacidad = () => {
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
          Aviso de Privacidad
        </Header>

        <ol >
          <li>
          <a href="#Aviso" style={{ color: '#007bff', textDecoration: 'underline' }}> Aviso de Privacidad Simplificado</a>
          </li>
          <li>
            <a href="#finalidad"   style={{ color: '#007bff', textDecoration: 'underline' }}>  Finalidad de los datos que se recaban</a>
          </li>
          <li>
            <a href="#transferencia" style={{ color: '#007bff', textDecoration: 'underline' }}> Transferencia de datos personales</a>
          </li>
          <li>
            <a href="#fundamento" style={{ color: '#007bff', textDecoration: 'underline' }}> Fundamento </a>
          </li>
          <li>
            <a href="#ARCO" style={{ color: '#007bff', textDecoration: 'underline' }}> Ejercicio de los (Derechos ARCO)</a>
          </li>
          <li>
            <a href="#Cambios" style={{ color: '#007bff', textDecoration: 'underline' }}> Menores de Edad </a>
          </li>
          <li>
            <a href="#Cambios" style={{ color: '#007bff', textDecoration: 'underline' }}> Cambios al Aviso de Privacidad </a>
          </li>
          

          {/* Agrega más ítems según sea necesario */}
        </ol>

        <p id="Aviso">
          <strong>1. Aviso de Privacidad Simplificado</strong>
        </p>
        <p>
        La aplicación "Chicharronera Lab" al ser considerada responsable del tratamiento de los datos personales que proporcione,
         se obliga a protegerlos conforme a la Ley General de Transparencia y Acceso a la Información Pública (LGTAIP), publicada en el Diario Oficial de la Federación el 20 de mayo de 2021;
          la Ley Federal de Transparencia y Acceso a la Información Pública (LFTAIP), publicada en el Diario Oficial de la Federación el 20 de mayo de 2021; la Ley General de Protección de Datos 
          Personales en Posesión de Sujetos Obligados (LGPDPPSO), publicada en el Diario Oficial de la Federación el 26 de enero de 2017, y demás normativa aplicable.
        </p>

        <p id="finalidad">
          <strong>2. Finalidad de los datos que se recaban </strong>
        </p>
        <p>
        Se entenderá por consentido el uso de sus datos personales exclusivamente para fines estadisticos y educativos ,
        sin que los anteriores sean expuestos al público.
        </p>
        <p id="transferencia">
          <strong> 3. Transferencia de datos personales </strong>
        </p>
        <p>
        No se realizarán transferencias adicionales, salvo aquellas situaciones en las que sean necesarias para atender 
        requerimientos de información de una autoridad competente o sujetos obligados de conformidad con el artículo 22 
        de la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados,
         publicada en el Diario Oficial de la Federación el 26 de enero de 2017.
        </p>

        <p id="fundamento">
          <strong>4. Fundamento </strong>
        </p>
        <p>
        El tratamiento de sus datos personales se realizará de conformidad con las funciones y atribuciones 
        con fundamento en los artículos 3o, fracción I, 16, 17, 18, 21, 25, 26, 27, 28 y 65 de 
        la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados, publicada 
        en el Diario Oficial de la Federación el 26 de enero de 2017, el articulo 2 apartado B fracción 
        VII del Reglamento Interior de la Secretaría de Educación Pública, publicado el 15 de septiembre de 2020,
        </p>

        <p id="ARCO">
          <strong>5.Ejercicio de los (Derechos ARCO)  </strong>
        </p>
        <p>
        La persona que así lo decida, podrá ejercer sus derechos ARCO  o bien, por medio de la Plataforma Nacional de Transparencia (PNT).
        </p>

        <p id="Menores">
          <strong>5.Ejercicio de los (Derechos ARCO)  </strong>
        </p>
        <p>
        En caso de que el Titular sea menor de edad, su padre o tutor deberá ser quien proporcione los Datos Personales del menor por medio de la aplicación
        "Chicharronera Lab" y otorgue el consentimiento para el tratamiento de dicha información.En este sentido, 
        se entiende que el consentimiento para tratar los Datos Personales del menor de edad es otorgado 
        por su padre o tutor.
        </p>

        <p id="#Cambios">
          <strong>6. Cambios al Aviso de Privacidad </strong>
        </p>
        <p>
        El presente aviso de privacidad puede sufrir modificaciones,
         cambios o actualizaciones derivadas de nuevos requerimientos legales o por otras causas.
        </p>

      

        {/* Agrega el resto de los términos y condiciones aquí */}

        
          <Button primary as={Link} to="/">
            Aceptar
          </Button>
      </Segment>
    </Container>
    </div>
  );
};

export default PA11AvisodePrivacidad;
