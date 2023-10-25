import { Divider, Header, Icon } from 'semantic-ui-react'

const Divisor = ({ horizontal, vertical, tamano, icono, descripcion }) => {
  return (
    <Divider horizontal={horizontal} vertical={vertical}>
      <Header as={tamano}>
        <Icon size='mini' name={icono} />
        {descripcion}
      </Header>
    </Divider>
  )
}

export default Divisor