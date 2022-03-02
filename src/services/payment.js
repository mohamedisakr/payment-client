import axios from 'axios'
import {apiUrl} from '../config/api'

export const pay = async (payment) => {
  try {
    const res = await axios.post(apiUrl, payment)
    return res
  } catch (err) {
    console.log(`Error : ${JSON.stringify(err, null, 4)}`)
    return err.response.data.error
  }
}
