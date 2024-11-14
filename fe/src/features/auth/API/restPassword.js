import axios from 'axios';
import { HOST_API_SERVER_1 } from '../../../services';
import { accessToken } from '../../../services/tokenService';

export const ResetPassword = async (userIds) => {
  try {
    const token = accessToken(); // Get the access token

    const response = await axios.post(
      `${HOST_API_SERVER_1}/reset-password`,
      {
        userIds,  
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      return {
        success: true,
        message: response.data.message || 'Operation successful',
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: `Unexpected status code: ${response.status}`,
      };
    }
  } catch (error) {
    // Improved error handling
    return {
      success: false,
      message: error.response
        ? error.response.data.message || 'Có lỗi xảy ra'
        : 'Không thể kết nối tới server',
    };
  }
};
