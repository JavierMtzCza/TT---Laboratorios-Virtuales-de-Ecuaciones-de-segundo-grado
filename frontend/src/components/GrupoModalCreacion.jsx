import { Button, Form, Header, Icon, Modal } from 'semantic-ui-react'
import { useForm } from "react-hook-form";

const GrupoModalCreacion = ({ propShow, propSetShow }) => {

	const { register, handleSubmit, formState: { errors }, reset } = useForm()

	const onSubmit = handleSubmit((formData) => {
		//reset({})
		alert("dsdsd")
	})

	return (
		<Modal
			onClose={() => propSetShow(false)}
			onOpen={() => propSetShow(true)}
			open={propShow}
		>
			<Modal.Header>Crear de un grupo</Modal.Header>
			<Modal.Content>
				<Form style={{ margin: "0 1% 15% 1%" }} error onSubmit={onSubmit}>
					<Form.Input required fluid label="Nombre" placeholder="Ingrese el nombre del Grupo">
						<input {...register("Nombre")} />
					</Form.Input>
					<Form.Input required fluid label="Descripción" placeholder="Descripcion del grupo">
						<input {...register("descripcion")} />
					</Form.Input>
					<Button floated='left' content="Cancelar" color='red' onClick={() => propSetShow(false)} />
					<Button floated='right' content="Crear Grupo" color='green' type='submit' />
				</Form>
			</Modal.Content>
		</Modal>
	)
}

export default GrupoModalCreacion