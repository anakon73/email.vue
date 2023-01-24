import { email } from '@/types/emailType'
import axios from 'axios'

const updateEmail = (email: email) => {
  axios.put(`http://localhost:3000/emails/${email.id}`, email)
}

export default updateEmail
