import { Usuario } from "../types/types";
import { fetchAPI } from "./api";

export const usuarioService = {
    findAll: async (): Promise<Usuario[]> => {
        return await fetchAPI('/usuario');
    },
    findOne: async (id: number): Promise<Usuario> => {
        return await fetchAPI(`/usuario/${id}`);
    },
    asignarRol: async (userId: number, rolId: number): Promise<Usuario> => {
        return await fetchAPI(`/usuario/${userId}/roles/${rolId}`, {
            method: 'POST'
        })
    }
}