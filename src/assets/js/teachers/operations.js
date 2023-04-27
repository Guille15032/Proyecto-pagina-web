// Encargado de la interacción de js con html

//Primero se importan las librerias de terceros
import alertify from 'alertifyjs';
import Swal from 'sweetalert2'; 

//Segundo se importan las librerias de propias
import { validateForm, validateField, removeInputErrorMessage, removeErrorClassNameFields, removeErrorMessageElements } from './../utils/validations';

//De tercero se importan las librerias en modulos
import { formElements, fieldConfigurations, getFormData, resetForm, setFormData } from './form';
import { createTeacher, readTeachers, findTeacherById } from './repository';


export function listeners() {
    window.addEventListener('load', () => {
        listenFormSubmitEvent();
        listTeachers();
        listenFormFieldsChangeEvent();
        listenFormResetEvent(); 
        listenTableClickEvent();
    });
}

function listenFormSubmitEvent() {
    formElements.form.addEventListener('submit', (event) => {
        event.preventDefault();
        alertify.dismissAll();

        if (validateForm(fieldConfigurations)) {
            createTeacher(getFormData());
            resetForm();
            removeErrorClassNameFields('is-valid');
            alertify.success('Registro del profesor realizado correctamente');
            listTeachers();
        } else {
            alertify.error('Verificar los datos del formulario');
        }
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
            row.classList.add('align-middle');


            // Se crea las columnas de la tabla
            const colId = document.createElement('td');
            colId.textContent = id;
            colId.classList.add('text-center');

            const colName = document.createElement('td');
            colName.textContent = name;
            colName.classList.add('text-center');

            const colDescription = document.createElement('td');
            colDescription.textContent = description;
            

            const colEmail = document.createElement('td');
            colEmail.textContent = email;
            colEmail.classList.add('text-center');

            const colBirthdate = document.createElement('td');
            colBirthdate.textContent = birthDate;
            colBirthdate.classList.add('text-center');

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
            editIcon.dataset.id = id;
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
            deleteIcon.dataset.id = id;
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


function listenFormFieldsChangeEvent(){
    fieldConfigurations.forEach(({ input, validations }) => {
        input.addEventListener('change', () => {
            removeInputErrorMessage(input);
            validations.forEach((validationConfig) => {
                validateField(input, validationConfig);

            })
        }); 
    });
}

function listenFormResetEvent(){
    formElements.form.addEventListener('reset', () => {
        removeErrorMessageElements();
        removeErrorMessageElements('is-valid');
        resetForm();
    });

}

function listenTableClickEvent(){
    const table = document.getElementById('tblTeachers');
    table.addEventListener('click', ({target}) => {

        const idTeacher = target.getAttribute('data-id');

        if(target.classList.contains('btn-edit') || target.classList.contains('fa-pencil')){
            editTeacher(idTeacher);

        } else if(target.classList.contains('btn-delete') || target.classList.contains('fa-trash')) {
            Swal.fire({
                title: '¿Estas seguro de que quieres eliminar el profesor: ?',
                text: 'No podras deshacer esta accion',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#b2b2b2',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cerrar'
            }). then((resultConfirm) => {
                    if(resultConfirm.isConfirmed){
                        
                    } else{
                        alertify.dismissAll();
                        alertify.message('Accion cancelada');
                    }
                
            })
        }
    });
}


function editTeacher(idTeacher){
    const teacher = findTeacherById(idTeacher);

    if (teacher) {
         setFormData(teacher);
         window.scrollTo({top: 0, behavior: 'smooth'});
    } else{
        alertify.error('El profesor seleccionado no existe, verifique la informacion')
    }

    console.log('Profesor encontrado para editar:', teacher);
}