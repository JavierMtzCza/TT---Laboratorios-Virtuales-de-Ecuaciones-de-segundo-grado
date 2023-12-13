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
			"calificacion": 0.0
		},
		setActividad: (actividadActual) => set({ actividad: actividadActual })
	}
}, { name: "act" }
))

import { create, persist } from 'zustand';

export const usePreguntaStore = create(persist((set) => {
  return {
    pregunta: {
      id: 0,
      opciones: [],
    },
    setPregunta: (preguntaActual) => set({ pregunta: preguntaActual }),
  };
}, { name: 'pregunta' }));

