// Encargado de acceder al localStorage del navegador


//Convierte un archivo 'string' en un archivo 'JSON'
export function getDatabase(dbName) {
    const database = JSON.parse(localStorage.getItem(dbName));
    return database ===null ? [] : database; 
}


//Convierte un archivo 'JSON' en un archivo 'string'
export function setDatabase(dbName, jsonData) {
    localStorage.setItem(dbName, JSON.stringify(jsonData));
}


