// Encargado de la interacción de js con html
import alertify from 'alertifyjs'; 

import { formElements, getFormData, resetForm } from './form';
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
        resetForm();
        alertify.success('Profesor guardado correctamente');
        listTeachers();
    });
}

function listTeachers(){
    const arrayTeachers = readTeachers();
    const tbody = document.querySelector('#tblTeachers tbody');
    tbody.innerHTML = '';

    if (arrayTeachers.length > 0) {

        //Con el 'forEach' se puede recorrer un array como si en Python fuera un 'for'
        arrayTeachers.forEach(( teacher ) => { 

            const { id, name, description, email, birthDate } = teacher;

            //Se crea las filas de la tabla
            const row = document.createElement('tr');
            row.classList.add('align-middle')


            // Se crea las columnas de la tabla
            const colId = document.createElement('td');
            colId.textContent = id;
            colId.classList.add('text-center')

            const colName = document.createElement('td');
            colName.textContent = name;

            const colDescription = document.createElement('td');
            colDescription.textContent = description;

            const colEmail = document.createElement('td');
            colEmail.textContent = email;

            const colBirthdate = document.createElement('td');
            colBirthdate.textContent = birthDate;

            const colButtons = document.createElement('td');
            colButtons.classList.add('text-center');
            
            //Boton editar
            const editButton = document.createElement('button');
            editButton.classList.add('btn', 'btn-primary', 'btn-edit', 'm-1');
            editButton.dataset.id = id;
            editButton.setAttribute('title', 'Editar');
            editButton.setAttribute('type', 'button');
            const editIcon = document.createElement('em');
            editIcon.classList.add('fa', 'fa-pencil');
            editButton.appendChild(editIcon);
            colButtons.appendChild(editButton);

            //Boton eliminar
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'btn-danger', 'btn-delete', 'm-1');
            deleteButton.dataset.id = id;
            deleteButton.setAttribute('title', 'Editar');
            deleteButton.setAttribute('type', 'button');
            const deleteIcon = document.createElement('em');
            deleteIcon.classList.add('fa', 'fa-trash');
            deleteButton.appendChild(deleteIcon);
            colButtons.appendChild(deleteButton);
            


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

    } else {
        const trEmpty = document.createElement('tr');
        const tdEmpty = document.createElement('td');
        tdEmpty.setAttribute('colspan', '6');
        tdEmpty.setAttribute('fa-solid', 'fa-rectangle-xmark');
        tdEmpty.textContent = "No se encuentran registros disponibles";
        tdEmpty.classList.add('text-center');
        trEmpty.appendChild(tdEmpty);

        tbody.appendChild(trEmpty);
}
}