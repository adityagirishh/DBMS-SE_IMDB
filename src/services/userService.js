// Fetch a user by their ID
export const fetchUserById = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Error fetching user');
      }
    } catch (error) {
      console.error('Error in fetchUserById:', error);
      throw error;
    }
  };
  
  // Fetch all users
  export const fetchAllUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Error fetching users');
      }
    } catch (error) {
      console.error('Error in fetchAllUsers:', error);
      throw error;
    }
  };
  
  // Create a new user
  export const createUser = async (userData) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        const newUser = await response.json();
        return newUser;
      } else {
        throw new Error('Error creating user');
      }
    } catch (error) {
      console.error('Error in createUser:', error);
      throw error;
    }
  };
  
  // Update an existing user by their ID
  export const updateUser = async (userId, updatedUserData) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        return updatedUser;
      } else {
        throw new Error('Error updating user');
      }
    } catch (error) {
      console.error('Error in updateUser:', error);
      throw error;
    }
  };
  
  // Delete a user by their ID
  export const deleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        return { message: 'User deleted successfully' };
      } else {
        throw new Error('Error deleting user');
      }
    } catch (error) {
      console.error('Error in deleteUser:', error);
      throw error;
    }
  };
  