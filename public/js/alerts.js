// hides alert Box if present 
export const hideAlert = () => {
    const alertBox = document.querySelector('.alert')
    if (alertBox) alertBox.parentElement.removeChild(alertBox)
    
}
/**
 * @DESC shows alert box based on type 
 * @PARAM type , message 
 */
export const showAlert = (type, message) => {
    hideAlert()
    const alertBox = `<div class="alert alert--${type}">${message}</div>`
    document.querySelector('body').insertAdjacentHTML('afterbegin', alertBox)
    window.setTimeout(hideAlert, 5000) // hide alert after 5 seconds
}