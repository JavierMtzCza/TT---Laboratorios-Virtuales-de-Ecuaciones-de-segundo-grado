import { Button, Form, Modal } from 'semantic-ui-react'
import { useForm } from "react-hook-form";
import { useUsuarioStore } from '../stores/UsuarioStore';

const GrupoModalCreacion = ({ propShow, propSetShow, actualizarGrupos }) => {

	const { register, handleSubmit, formState: { errors }, reset } = useForm()
	const usuario = useUsuarioStore(state => state.usuario)

	const postGrupo = async (data) => {
		try {
			const response = await fetch(`http://localhost:3000/grupo/${usuario.perfil.correo}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})
			if (response.ok) {
				await alert("Creado correctamente")
				actualizarGrupos()
				propSetShow(false)
				reset({
					nombre: "",
					descripcion: ""
				})
			}
		} catch (error) {
			console.log(error)
		}
	}

	const onSubmit = handleSubmit((formData) => {
		postGrupo({
			nombre: formData.nombre,
			descripcion: formData.descripcion
		})
	})

	return (
		<Modal
			onClose={() => propSetShow(false)}
			onOpen={() => propSetShow(true)}
			open={propShow}
			size='tiny'
		>
			<Modal.Header>Crear de un grupo</Modal.Header>
			<Modal.Content>
				<Form style={{ margin: "0 1% 15% 1%" }} error onSubmit={onSubmit}>
					<Form.Input required fluid label="Nombre" placeholder="Ingrese el nombre del Grupo">
						<input {...register("nombre")} />
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