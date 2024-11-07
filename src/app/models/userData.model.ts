/**
 * Modelo usuario, que corresponde a como se guardan los datos en Firestore
 */
export interface UserData {
  /** Nombre del usuario */
    nombre: string;
    /**Apellidos del usuario */
    apellidos: string;
    /**Email del usuario, con el que iniciará sesión */
    email: string;
    /**Fecha de nacimiento del usuario */
    fechaNacimiento: Date;
    /**Id unico para la base de datos */
    uid?: string;
  }