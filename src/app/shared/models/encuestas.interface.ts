//import { Ciudad } from './encuestadores.interface';
export interface Encuesta {
    id?: number,
    nombre: string,
    apellido: string,
    animal: string,
    encuestador: string,
    url: string;
    idEncuestador:number      
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


