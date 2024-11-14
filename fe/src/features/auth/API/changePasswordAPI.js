import axios from 'axios'
import { HOST_API_SERVER_1 } from '../../../services'
import { accessToken } from '../../../services/tokenService'

export const changePassword = async (oldPassword, newPassword) => {
  try {
    const token = accessToken()
    const response = await axios.post(
      `${HOST_API_SERVER_1}/change-password`,
      {
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )

    if (response.status === 200) {
      return { success: true, message: response.data.message }
    }
  } catch (error) {
    return {
      success: false,
      message: error.response ? error.response.data.message : 'Có lỗi xảy ra',
    }
  }
}
