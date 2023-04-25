// Utilidad para realizar validaciones con js

export function validateForm(fieldConfigurations) {

    let isValid = true;

    fieldConfigurations.forEach(( fieldConfig ) => {
        fieldConfig.validations.forEach(( validationConfig ) => {
            const currentFileIsValid = validateField(fieldConfig.input, validationConfig);
            isValid = isValid && currentFileIsValid;
        })
    });

    return isValid;

}


function validateField(input, validationConfig){
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
    errorMessageElement.classList.add('invalid-feedback');
    errorMessageElement.setAttribute('id', errorId);
    errorMessageElement.textContent = errorMessage;
    return errorMessageElement;
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** */
function removeErrorMessageElements() {

}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** */
function removeInputErrorMessage(input) {

}