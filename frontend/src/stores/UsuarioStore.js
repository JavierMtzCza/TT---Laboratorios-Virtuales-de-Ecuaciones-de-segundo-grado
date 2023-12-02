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
			"nombre": "",
			"descripcion": "",
			"clave": "",
		},
		setGrupo: (grupoActual) => set({ grupo: grupoActual })
	}
}, { name: "group" }
))


export const useResetPasswordStore = create(persist((set) => {
	return {
		cambiocontrasena: {
			"correo": "",
			"codigo": "",
			"nuevaContrasena": "",
			"confirmarContrasena": "",
		},
		setCambioContrasena: (resetPasswordData) => set({ cambiocontrasena: resetPasswordData }),
	}
  }, { name: 'resetpassword' }
  ))
