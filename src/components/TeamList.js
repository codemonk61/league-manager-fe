import { useEffect, useState } from "react";
import Text from "./Text";
import { getTeams } from "../fetch";

function TeamList() {

  const [teams, setTeams] = useState([])

  async function loadTeams() {
  try {
    const teams = await getTeams();
    setTeams(teams)
    console.log("Teams loaded successfully:", teams);
    /* Example response:
    [
      {
        id: 1,
        name: "Team A",
        players: [
          { id: 1, name: "Player 1", level: "pro" },
          { id: 2, name: "Player 2", level: "medium" }
        ]
      },
      {
        id: 2,
        name: "Team B",
        players: [
          { id: 3, name: "Player 3", level: "noob" }
        ]
      }
    ]
    */
  } catch (error) {
    console.error("Failed to load teams:", error.message);
  }
}

useEffect(()=>{
// Call the function
loadTeams();
}, [])

console.log(teams)
  return (
    <div>
      <Text variant="h2">Generated Teams</Text>
      {teams.length === 0 ? (
        <Text>Teams will appear here.</Text>
      ) : (
        <div >
         {
          "Teams Table"
         }
        </div>
      )}
    </div>
  );
}


export default TeamList