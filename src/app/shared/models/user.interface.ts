export type Role = "TRABAJADOR" | "ADMIN" | "NULL";
export interface User {
    email_usuario: string;
    clave_usuario: string;
}

export interface Usuario {
    nombre_usuario: string;
    email_usuario: string;
    clave_usuario: string;
    estado_usuario: boolean;
    id_rol:number
}

export interface UserResponse{
    token:string;
}

export interface GetAllUsuarios{
    id:number;
    nombre_usuario:string;
    email_usuario:string;
    estado_usuario:string;
    id_rol:any;
    createdAt?:any;
    updatedAt?:any;
}

export interface RequestResponseGetAll {
  success: boolean,
  data?: GetAllUsuarios[],
  msg?: string
}

export interface RequestResponseDesabilitar {
  success: boolean,
  msg: string
}


