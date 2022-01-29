//import { Ciudad } from './encuestadores.interface';
export interface Encuestador {
    id?: number,
    nombre: string,    
    createdAt?:any,
    updatedAt?:any,      
}

export interface RequestResponseGetAllEncuestador {
  success: boolean,
  data: Encuestador[],
  msg?: string
}

export interface RequestResponseActualizar {
  success: boolean,
  msg: string
}


