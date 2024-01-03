import { useMediaQuery } from 'react-responsive';
import { Grid, Header, Image } from 'semantic-ui-react';
import NavbarLg from '../components/NavbarLg.jsx';
import NavbarMb from '../components/NavbarMb.jsx';
import { Link } from 'react-router-dom';
import school from '../images/school.png';
import imagen from '../images/Group 1 (2).svg';
import logo from '../images/matematicas.png';

const PA1Inicio = () => {
  const isDesktop = useMediaQuery({ query: "(min-width:1024px)" });

  return (
    <>
      {isDesktop ? <NavbarLg imagen={logo} /> : <NavbarMb imagen={logo} />}
      <Grid centered>
        <Grid.Column width={isDesktop ? 6 : 16} verticalAlign='middle'>
          <Header as='h1' image={school} content='ChicharroneraLab' />
          <Header as='h2' content='Pon a prueba tus conocimientos y desarrolla tus habilidades!!' />
          {isDesktop && (
            <Link to="/Labs">
              <button className='button1'>Prueba los laboratorios</button>
            </Link>
          )}
        </Grid.Column>
        {isDesktop && (
          <Grid.Column width={10}><Image fluid src={imagen} alt="Logo" /></Grid.Column>
        )}
        {!isDesktop && (
          <Grid.Column width={16} textAlign='center' style={{ marginTop: '20px' }}>
            <Link to="/Labs">
              <button className='button1'>Prueba los laboratorios</button>
            </Link>
            <Image fluid src={imagen} alt="Logo" />
          </Grid.Column>
        )}
      </Grid>
    </>
  );
};

export default PA1Inicio;
