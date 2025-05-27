// App.tsx
import { useState, useEffect, useCallback } from "react";
import PlayerForm from "./components/PlayerForm";
import PlayerList from "./components/PlayerList";
import TeamList from "./components/TeamList";
import Tabs from "./components/Tab";
import Button from "./components/Button";
import { createPlayer, deletePlayer, generateTeams, getPlayers } from "./fetch";



function App() {

  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);


const handlePlayerCreation = useCallback(async (player) => {
  try {
    const newPlayer = await createPlayer(player);
    console.log("Player created successfully:", newPlayer);

    return newPlayer; 
  } catch (error) {
    console.error("Failed to create player:", error.message);
 
    throw error; 
  }
}, []);

  async function loadPlayers() {
    try {
      const players = await getPlayers();
      setPlayers(players)

    } catch (error) {
      console.error("Failed to load players:", error.message);
    }
  }

  const handlePlayerDeletion = useCallback (async(id) => {
  try {
    const result = await deletePlayer(id); 
    console.log("Player deleted successfully:", result);
  
  } catch (error) {
    console.error("Failed to delete player:", error.message);
  }
}, [])

async function handleTeamGeneration() {
  try {
    const result = await generateTeams();
    console.log("Teams generated successfully:", result);
   
  } catch (error) {
    console.error("Failed to generate teams:", error.message);

  }
}


  const tabData = [
    {
      label: 'Create Team',
      content: <> <PlayerForm handlePlayerCreation={handlePlayerCreation} />
        <PlayerList players={players} handlePlayerDeletion={handlePlayerDeletion}/>
        <Button
          onClick={handleTeamGeneration}
          varient="primary"
          disabled={players.length % 2 !== 0}
        >
          {players.length % 2 === 0 ? "Generate Teams" : "Add 1 more player"}
        </Button>
      </>
    },
    {
      label: 'Team List',
      content: <TeamList teams={teams} />
    },
  ];

  useEffect(() => {
    loadPlayers()
  }, [handlePlayerCreation, handlePlayerDeletion])
  return (
    <>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
        <Tabs tabs={tabData} variant="pill" />
      </div>

    </>
  );
}

export default App;
