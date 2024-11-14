import axios from 'axios';
import { HOST_API_SERVER_1 } from '../../../services';

/**
 * Activate the password for an employee.
 * @param {string} oldPassword - The current password of the employee.
 * @param {string} newPassword - The new password to set.
 * @param {string} employeeId - The ID of the employee.
 * @returns {Promise<Object>} - An object indicating success or failure with a message.
 */
export const ActivatePasswordLogin = async (oldPassword, newPassword, employeeId) => {
  try {
    // Send a POST request to activate the password
    const response = await axios.post(
      `${HOST_API_SERVER_P}/activate-password`, 
      {
        oldPassword, // shorthand for oldPassword: oldPassword
        newPassword, // shorthand for newPassword: newPassword
        employeeId,  // shorthand for employeeId: employeeId
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Check if the response status is 200 (OK)
    if (response.status === 200) {
      return {
        success: true,
        message: response.data.message, // Return the success message
      };
    }
  } catch (error) {
    // Return error information
    return {
      success: false,
      message: error.response ? error.response.data.message : 'Có lỗi xảy ra', // Default error message if response is not available
    };
  }
};
