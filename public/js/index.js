import '@babel/polyfill' // makes es6 feature compatible 

import { login, logout, signup } from './login'
import { approveCampaign, declineCampaign, suspendCampaign, addCampaign } from './campaign'


// DOM ELEMENT 
const loginForm = document.querySelector('.form')
const logoutBtn = document.querySelector('.nav__el--logout')
const signupForm = document.querySelector('.form--signup')
const addButton = document.querySelector('.btn-add')

const approveButtons = document.getElementsByClassName("btn-approve")
const declineButtons = document.getElementsByClassName("btn-decline")
const suspendButtons = document.getElementsByClassName("btn-suspend")



// add event listener to approveButtons
if (approveButtons) {
    for (var i = 0; i < approveButtons.length; i++) {
        approveButtons[i].addEventListener('click', function (e) {
            e.preventDefault()
            approveCampaign(this.dataset.id)
        })
    }
}
// add event listener to decline button 
if (declineButtons) {

    for (var i = 0; i < declineButtons.length; i++) {
        declineButtons[i].addEventListener('click', function (e) {
            e.preventDefault()
            declineCampaign(this.dataset.id)
        })
    }
}

// add event listener to suspend button 
if (suspendButtons) {

    for (var i = 0; i < suspendButtons.length; i++) {
        suspendButtons[i].addEventListener('click', function (e) {
            e.preventDefault()
            suspendCampaign(this.dataset.id)
        })
    }

}


// add event listener to addButton 
if (addButton) {
    addButton.addEventListener('click', (e) => {
        e.preventDefault()
        const name = document.getElementById('name').value
        const description = document.getElementById('description').value
        const address = document.getElementById('address').value
        const date = document.getElementById('date').value
        
        addCampaign(name,description,address,date);
    })
}


// add event listener for login 
if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault()
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        login(email,password)
    })
}
// add event listener to logout button
if (logoutBtn) logoutBtn.addEventListener('click',logout)
    
// add event listener to signup button 
if (signupForm) {
    signupForm.addEventListener('submit', e => {
        e.preventDefault()
        const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const passwordConfirm = document.getElementById('passwordConfirm').value
        signup(name,email,password,passwordConfirm)
    })
}

