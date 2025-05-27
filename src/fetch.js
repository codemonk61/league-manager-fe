/**
 * Creates a new player by sending a POST request to the server
 * @param {Object} playerData - Player details
 * @param {string} playerData.name - Player's name
 * @param {"pro" | "medium" | "noob"} playerData.level - Skill level
 * @returns {Promise<Object>} Response data from the server
 * @throws {Error} If request fails or server returns an error
 */

// const API_URL = "http://localhost:5000";
const API_URL = "https://league-manager-be.onrender.com";


export async function createPlayer({ name, level }) {
  try {
    const response = await fetch(`${API_URL}/api/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, level }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create player");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating player:", error);
    throw error; 
  }
}

/**
 * Fetches players from the server
 * @returns {Promise<Array>} List of players
 * @throws {Error} If request fails or server returns an error
 */
export async function getPlayers() {

  
  try {
    const response = await fetch(`${API_URL}/api/players`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch players");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error; 
  }
}

export async function deletePlayer(playerId) {
 
  try {
    const response = await fetch(`${API_URL}/api/players/${playerId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete player");
    }

 
    return await response.json();
  } catch (error) {
    console.error("Error deleting player:", error);
    throw error; 
  }
}

export async function generateTeams() {
  
  try {
    const response = await fetch(`${API_URL}/api/teams/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      
      },
     
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to generate teams");
    }

    return await response.json();
  } catch (error) {
    console.error("Error generating teams:", error);
    throw error; 
  }
}


/**
 * Fetches teams from the server
 * @returns {Promise<Array>} List of teams
 * @throws {Error} If request fails or server returns an error
 */
export async function getTeams() {
  
  try {
    const response = await fetch(`${API_URL}/api/teams/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch teams");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
}