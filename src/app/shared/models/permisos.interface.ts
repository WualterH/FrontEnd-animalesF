export interface Permiso {
    id?: number,
    nombre: string,
    descripcion: string,
    createdAt?:any,
    updatedAt?:any
}

export interface RequestResponseGetAllPermiso {
  success: boolean,
  data: Permiso[],
  msg?: string
}


