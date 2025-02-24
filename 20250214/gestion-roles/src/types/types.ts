export interface Rol {
    id?: number;
    nombre: string;
    descripcion?: string;
    estado?: string;
    fechaCreacion?: Date;
    fechaActualizacion?: Date;
    usuarios?: Usuario[];
}

export interface Usuario {
    id?: number;
    cedula: string;
    nombre: string;
    apellido: string;
    email: string;
    fechaNacimiento: Date;
    fechaCreacion?: Date;
    fechaActualizacion?: Date;
    roles?: Rol[];
}