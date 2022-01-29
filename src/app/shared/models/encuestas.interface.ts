//import { Ciudad } from './encuestadores.interface';
export interface Encuesta {
    id?: number,
    nombre: string,
    apellido: string,
    animal: string,
    encuestador: number,
    id_encuestador:number      
    createdAt?:any,
    updatedAt?:any,      
}

export interface RequestResponseGetAllEncuesta {
  success: boolean,
  data: Encuesta[],
  msg?: string
}

export interface RequestResponseActualizar {
  success: boolean,
  msg: string
}

