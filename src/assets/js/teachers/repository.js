// De guardar, actualizar, leer o eliminar los datos en el storage

import { getDatabase, setDatabase } from './../utils/storage';

const dbName = 'db_teachers'; //Con esta linea se cambia el nombre de la base de datos

export function createTeacher(teacher){
    const arrayTeachers = getDatabase(dbName);
    arrayTeachers.push(teacher);
    setDatabase(  dbName, arrayTeachers );
}

