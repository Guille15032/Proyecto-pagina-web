// encargado de la interacción y configuración del formulario

/**
 * Este objeto contiene las referencias a los elementos clave del formulario
 */
export const formElements = {
    form: document.getElementById('teacherForm'),
    fields: {
        name: document.getElementById('txtName'),
        description: document.getElementById('txtDescription'),
        email: document.getElementById('txtEmail'),
        birthDate: document.getElementById('txtBirthDate'),
    }
};


/**
 * Este codigo es otra forma de obtener los datos de un formulario por medio de la clase reservada 'formData'
 
    const formData = new FormData(formElements.form);
    return Object.fromEntries (formData.entries());
 */

    
export function getFormData() {
    const teacher = {
        name: formElements.fields.name.value,
        description: formElements.fields.description.value,
        email: formElements.fields.email.value,
        birthDate: formElements.fields.birthDate.value,
    };
    return teacher;
}