const { pool } = require('../index');  // Assuming pool is initialized in index.js

class User {
  // Create a new user
  static async createUser(username, password, email) {
    try {
      const result = await pool.query(
        'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
        [username, password, email]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error creating user: ${err.message}`);
    }
  }

  // Find user by username
  static async findByUsername(username) {
    try {
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error finding user by username: ${err.message}`);
    }
  }

  // Find user by ID
  static async findById(id) {
    try {
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error finding user by ID: ${err.message}`);
    }
  }

  // Find user by Google ID
  static async findByGoogleId(googleId) {
    try {
      const result = await pool.query('SELECT * FROM users WHERE google_id = $1', [googleId]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error finding user by Google ID: ${err.message}`);
    }
  }

  // Find user by Microsoft ID
  static async findByMicrosoftId(microsoftId) {
    try {
      const result = await pool.query('SELECT * FROM users WHERE microsoft_id = $1', [microsoftId]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error finding user by Microsoft ID: ${err.message}`);
    }
  }

  // Update an existing user by ID
  static async updateUser(id, userData) {
    const { username, password, email } = userData;
    try {
      const result = await pool.query(
        'UPDATE users SET username = $1, password = $2, email = $3 WHERE id = $4 RETURNING *',
        [username, password, email, id]
      );
      if (result.rows.length === 0) {
        throw new Error('User not found');
      }
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error updating user: ${err.message}`);
    }
  }

  // Delete a user by ID
  static async deleteUser(id) {
    try {
      const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
      if (result.rows.length === 0) {
        throw new Error('User not found');
      }
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error deleting user: ${err.message}`);
    }
  }
}

module.exports = User;
