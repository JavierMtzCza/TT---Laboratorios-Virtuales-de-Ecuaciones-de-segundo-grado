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


