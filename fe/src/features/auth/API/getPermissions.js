import axios from 'axios'
import { HOST_API_SERVER_1 } from '../../../services'
import { accessToken } from '../../../services/tokenService'

export const GetUserPermissions = async () => {
  try {
    const token = accessToken()
    const response = await axios.get(
      `${HOST_API_SERVER_1}/details/me`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )

    return {
      success: true,
      data: response.data,
    }
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message || 'Có lỗi xảy ra'
      : 'Không thể kết nối tới server'

    return {
      success: false,
      message: errorMessage,
    }
  }
}
