// Encargado de la interacción de js con html
import { formElements, getFormData } from './form';
import { createTeacher, readTeachers } from './repository';

export function listeners() {
    window.addEventListener('load', () => {
        listenFormSubmitEvent();
        listTeachers();
    });
}

function listenFormSubmitEvent() {
    formElements.form.addEventListener('submit', (event) => {
        event.preventDefault();
        createTeacher(getFormData());
        listTeachers();
    });
}

function listTeachers(){
    const arrayTeachers = readTeachers();
    const tbody = document.querySelector('#tblTeachers tbody');
    tbody.innerHTML = '';
    

    //Con el 'forEach' se puede recorrer un array como si en Python fuera un 'for'
    arrayTeachers.forEach(( teacher, index ) => { 

        //Se crea las filas de la tabla
        const row = document.createElement('tr');


        // Se crea las columnas de la tabla
        const colId = document.createElement('td');
        colId.textContent = index;

        const colName = document.createElement('td');
        colName.textContent = teacher.name;

        const colDescription = document.createElement('td');
        colDescription.textContent = teacher.description;

        const colEmail = document.createElement('td');
        colEmail.textContent = teacher.email;

        const colBirthdate = document.createElement('td');
        colBirthdate.textContent = teacher.birthDate;

        const colButtons = document.createElement('td');


        //Se agregan las columnas a las filas
        row.appendChild(colId);
        row.appendChild(colName);
        row.appendChild(colDescription);
        row.appendChild(colEmail);
        row.appendChild(colBirthdate);
        row.appendChild(colButtons);


        //Se agrega la fila al tbody
        tbody.appendChild(row);
    }); 
}