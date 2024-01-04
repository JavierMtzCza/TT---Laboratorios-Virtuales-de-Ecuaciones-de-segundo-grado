import { Button, Form, Modal } from 'semantic-ui-react'
import { useForm } from "react-hook-form";
import { useGrupoStore, useUsuarioStore } from '../stores/UsuarioStore';

const GrupoModalCreacion = ({ propShow, propSetShow, actualizarGrupos }) => {

	const { register, handleSubmit, formState: { errors }, reset } = useForm();
	const usuario = useUsuarioStore(state => state.usuario);
	const grupoActual = useGrupoStore(state => state.grupo);

	const postGrupo = async (data) => {
		try {
			const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/grupo/crear`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
				token: usuario.token,
				nombre: data.nombre,
				descripcion: data.descripcion,
			}),
		});

		if (response.ok) {
			const { claveGrupo } = await response.json();

			// Establece la clave del grupo actual seleccionado antes de crear la actividad
			useGrupoStore.setState({ grupo: { ...grupoActual, clave: claveGrupo } });
			await alert('Creado correctamente');
			// Accede a la clave del grupo actual desde el estado global y úsala según sea necesario
			actualizarGrupos();
			propSetShow(false);
			reset({
				nombre: '',
				descripcion: '',
			});
			}
		} catch (error) {
			console.log(error);
		}
	};
	
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
					<Form.Input required fluid label="Nombre" placeholder="Ingrese el nombre del grupo">
						<input {...register("nombre")} />
					</Form.Input>
					<Form.Input required fluid label="Descripción" placeholder="Descripción del grupo">
						<input {...register("descripcion")} />
					</Form.Input>
					<Button floated='left' type='button' content="Cancelar" color='red' onClick={() => propSetShow(false)} />
					<Button floated='right' content="Crear Grupo" color='green' type='submit' />
				</Form>
			</Modal.Content>
		</Modal>
	)
}

export default GrupoModalCreacion