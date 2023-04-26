// Utilidad para realizar validaciones con js

export function validateForm(fieldConfigurations) {
    let isValid = true;
    removeErrorMessageElements();

    fieldConfigurations.forEach(( fieldConfig ) => {
        fieldConfig.validations.forEach(( validationConfig ) => {
            const currentFileIsValid = validateField(fieldConfig.input, validationConfig);
            isValid = isValid && currentFileIsValid;
        })
    });

    return isValid;

}


export function validateField(input, validationConfig){
    const {errorId, errorMessage, validationFunction} = validationConfig;
    const fieldIsValid = validationFunction(input.value);

    // if (!fieldIsValid) { - Esta linea de codigo hace lo mismo de la de abajo
    if (!fieldIsValid) {
        input.classList.add('is-invalid');
        const errorMessageElement = createErrorMessageElement(errorId, errorMessage);
        input.insertAdjacentElement('afterend', errorMessageElement);
    } else {
        input.classList.add('is-valid');
    }

    return fieldIsValid;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**Crea un elemento de mensae de error para ser insertado despues de que un campo no es valido
 * @private
 * @param {string} errorId - El ID del elemento del mensaje de error
 * @param {string} errorMessage - El mensaje de error que se muestra al usuario
 * @returns {HTMLDivElement} - Retorna el elemento que contiene el mensaje de error
 */

function createErrorMessageElement(errorId, errorMessage) {
    const errorMessageElement = document.createElement('div');
    errorMessageElement.classList.add('invalid-feedback', 'text-start');
    errorMessageElement.setAttribute('id', errorId);
    errorMessageElement.textContent = errorMessage;
    return errorMessageElement;
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** */
export function removeErrorMessageElements() {
    
    const errorMessageElements = document.querySelectorAll('.invalid-feedback'); //Recorre que elementos tenian la clase 'invalid-feedback'
    errorMessageElements.forEach((element) => {
        element.remove();
    });

    removeErrorClassNameFields('is-invalid');

}

export function removeErrorClassNameFields(className) {
    const inputs = document.querySelectorAll('.form-control'); 
    inputs.forEach((input) => {
        input.classList.remove(className);
    });
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**Elimina todos los elementos de mensajes de error asociados a un input y restablece su estado visual (elimina la clase 'is-invalid' que pone el border rojo) 
 * La funcion continua eliminando los elementos mensaje de error que son adyacentes (hermanos) mientras se encuentre la clase 'invalid-feedback'
 * @param {HTMLInputElement} input - El campo para que el que se eliminara los mensajes de error
*/

export function removeInputErrorMessage(input) {
    let errorMessageElement = input.nextElementSibling;
    while( errorMessageElement && errorMessageElement.classList.contains('invalid-feedback') ) {
        errorMessageElement.remove();
        input.classList.remove('is-invalid');
        errorMessageElement = input.nextElementSibling;
    }
}