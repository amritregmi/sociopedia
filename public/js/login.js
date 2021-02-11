import axios from 'axios'
import { showAlert } from './alerts'

/** 
 * @DESC Login's the user into the system 
 * @PARAM email, password
*/
export const login = async (email, password) => {
    try {
       
        // ajax call 
        const res = await axios({
            method: 'POST',
            url: '/api/users/login',
            data: {
                email,
                password
            }
        })
        console.log(res.data);
        // if successful status == success
        if (res.data.status === 'success') {
            showAlert('success', 'Logged in successfully, WELCOME!')
            //reload after 1.5 second 
            window.setTimeout(() => {
                location.assign('/')
            }, 1500)
        }
        console.log(res.data);
    } catch (err) {
        showAlert('error', `invalid email or password`)
        window.setTimeout(() => {
            location.assign('/login')
        },1500)
    }
}

/** 
 * @DESC Log's the user out from  the system 
*/
export const logout = async () => {
    try {
        // ajax request to the api 
        const res = await axios({
            method: 'GET',
            url:'/api/users/logout'
        })
        if (res.data.status === 'success') {
            showAlert('error', 'Logout Successful, Please Log in')
            window.setTimeout(() => {
                location.assign('/')
            }, 1500)
        }
    } catch (error) {
        console.log(error.response.data);
        showAlert('error','Error Logging out, Try again')
    }
}

/** 
 * @DESC Creates a account 
 * @PARAM name,email,password, passwordConfirm 
*/
export const signup = async (name, email, password, passwordConfirm) => {
    try {
        // ajax call 
        const res = await axios({
            method: 'POST',
            url: '/api/users/signup',
            data: {
                name, email, password, passwordConfirm
            }
        })

        if (res.data.status === 'success') {
            showAlert('success', 'Signup Successful, Please Log in')
            //reload after 1.5 second  and redirect to login Page
            window.setTimeout(() => {
                location.assign('/login')
            }, 1500)
        }
        
    } catch (error) {
        const message = error.response.data.message
        showAlert('error', `signup unsuccessful ${message}`)
        // stay on the same page 
    }
}