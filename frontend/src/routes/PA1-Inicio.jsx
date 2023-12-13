import { useMediaQuery } from 'react-responsive'

import logo from '../images/matematicas.png'
import imagen from '../images/Group 1 (2).svg'
import school from '../images/school.png'

import { Grid, Header, Image } from 'semantic-ui-react'
import NavbarLg from '../components/NavbarLg.jsx'
import NavbarMb from '../components/NavbarMb.jsx'
import { Link } from 'react-router-dom'


const PA1Inicio = () => {

   const laptopOrDesktop = useMediaQuery({ query: "(min-width:1024px)" })

   return (
      <>
         {laptopOrDesktop ? <NavbarLg imagen={logo} /> : <NavbarMb imagen={logo} />}
         <Grid centered>
            <Grid.Column width={laptopOrDesktop ? 6 : 16} verticalAlign='middle'>
               <Header as='h1' image={school} content='MateLab' />
               <Header as='h2' content='Pon a prueba tus conocimientos y desarrolla tus habilidades!!' />
               {laptopOrDesktop ? <button className='button1'>Prueba los laboratorios</button> : <></>}
            </Grid.Column>
            {laptopOrDesktop ?
               <Grid.Column width={10}><Image fluid src={imagen} alt="Logo" /></Grid.Column> :
               <>
                  <img src={imagen} alt="Logo" height={250} />
                  <br />
                  <br />
                  <Link to={"/InicioSesion"}>
                     <button className='button1' >Prueba los laboratorios</button>
                  </Link>

               </>
            }
         </Grid>
      </>
   )
}

export default PA1Inicio