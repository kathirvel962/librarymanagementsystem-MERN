import { toast } from 'react-toastify'

export const notifySuccess = (message) => {
  toast.success(message || 'Success', {
    position: 'top-right',
    autoClose: 3000,
  })
}

export const notifyError = (message) => {
  toast.error(message || 'Something went wrong', {
    position: 'top-right',
    autoClose: 5000,
  })
}

export const notifyInfo = (message) => {
  toast.info(message || 'Info', {
    position: 'top-right',
    autoClose: 3000,
  })
}

export default {
  notifySuccess,
  notifyError,
  notifyInfo,
}
