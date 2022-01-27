export interface GetAllRoles {
    success: boolean,
    data?: Roles[],
    msg?: string
}

export interface Roles {
    id?: number,
    nombre: string,
    descripcion: string,
    estado:boolean,
    createdAt?:any,
    updatedAt?:any
}

export interface RequestResponseGetAllRoles {
  success: boolean,
  data?: Roles[],
  msg?: string
}

export interface RequestResponseActualizar {
  success: boolean,
  msg: string
}


