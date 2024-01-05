import { create } from 'zustand'
import { persist } from "zustand/middleware";

export const useUsuarioStore = create(persist((set) => {
	return {
		usuario: {
			"token": "",
			"perfil": {
				"id": 0,
				"nombre": "",
				"apellido_paterno": "",
				"apellido_materno": "",
				"correo": ""
			}
		},

		setUsuario: (usuarioLogeado) => set({ usuario: usuarioLogeado })
	}
}, { name: "auth" }
))

export const useGrupoStore = create(persist((set) => {
	return {
		grupo: {
			"id": 0,
			"nombre": "",
			"descripcion": "",
			"clave": "",
		},
		setGrupo: (grupoActual) => set({ grupo: grupoActual })
	}
}, { name: "group" }
))

export const useActividadStore = create(persist((set) => {
	return {
		actividad: {
			"id": 0,
			"nombre": "",
			"descripcion": "",
			"fechaLimite": "",
			"tipo": "",
			"PreguntaCuestionario": [],
			"PreguntaEjercicio": [],
			"prueba": false
		},

		setActividad: (actividadActual) => set({ actividad: actividadActual }),

	}
}, { name: "act" }
))


export const usePreguntaActualStore = create(persist((set) => {
	return {
		preguntaActual: {
			id: 0,
			texto: '',
			opciones: [],
			imagen: null,
			opcionCorrecta: null,
		},
		setPreguntaActual: (pregunta) => set({ preguntaActual: pregunta }),
		resetPreguntaActual: () => set({ preguntaActual: { id: 0, texto: '', opciones: [], imagen: null, opcionCorrecta: null } }),
	};
}, { name: 'preguntaActual' }));
