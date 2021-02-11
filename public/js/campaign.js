import axios from 'axios'
import { showAlert } from './alerts'

// approve campaign Data 
export const approveCampaign = async (id)=>{
    try {
        const response = await axios({
            method: 'PATCH',
            url: `/api/campaign/${id}`,
            data: {
                approved:true,
            }
        })
        // if successful 
        if (response.data.status === 'success') {
            showAlert('success', 'Campaign approved')
            window.setTimeout(() => {
                location.assign('/')
            },1000)
        }
    } catch (error) {
        showAlert('error', 'something went wrong, Try again')
        window.setTimeout(() => {
            location.assign('/')
        },1)
    }
}


export const declineCampaign = async (id)=>{
    try {
        const response = await axios({
            method: 'DELETE',
            url: `/api/campaign/${id}`,
            
        })
        // if successful 
        if (response.data.status === 'success') {
            showAlert('success', 'Campaign Deleted')
            window.setTimeout(() => {
                location.assign('/')
            },1500)
        }
    } catch (error) {
        showAlert('error', 'something went wrong, Try again')
        window.setTimeout(() => {
            location.assign('/')
        },1)
    }
}

export const suspendCampaign = async (id)=>{
    try {
        const response = await axios({
            method: 'PATCH',
            url: `/api/campaign/${id}`,
            data: {
                approved:false,
            }
        })
        // if successful 
        if (response.data.status === 'success') {
            showAlert('success', 'Campaign suspended')
            window.setTimeout(() => {
                location.assign('/')
            },1)
        }
    } catch (error) {
        showAlert('error', 'something went wrong, Try again')
        window.setTimeout(() => {
            location.assign('/')
        },1)
    }
}

// Adds campaign Data
export const addCampaign = async (name, description, address, date) => {
    
    try {
        // send post request to backend api 
        const response = await axios({
            method: 'POST',
            url: "/api/campaign/",
            data: {
                name,description,address,date
            }
        })
        // if successful 
        if (response.data.status === 'success') {
            showAlert('success', 'Campaign added, Please allow admin to approve!!')
            window.setTimeout(() => {
                location.assign('/')
            },1500)
        }
    } catch (error) {
        showAlert('error', 'Please Fill up the Form correctly')
        window.setTimeout(() => {
            location.assign('/addCampaign')
        },1500)
        
    }
}