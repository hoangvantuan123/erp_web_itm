import axios from 'axios';
import { HOST_API_SERVER_1 } from '../../../services';
import { accessToken } from '../../../services/tokenService';

export const AccountArchive = async (userIds, status) => {
  try {
    const token = accessToken(); 

    const response = await axios.patch(
      `${HOST_API_SERVER_P}/status-acc`,
      {
        userIds,  
        status
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
