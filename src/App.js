// App.tsx
import { useState, useEffect, useCallback } from "react";
import PlayerForm from "./components/PlayerForm";
import PlayerList from "./components/PlayerList";
import TeamList from "./components/TeamList";
import Tabs from "./components/Tab";
import Button from "./components/Button";
import { createPlayer, deletePlayer, generateTeams, getPlayers, getTeams } from "./fetch";
import Loader from "./components/Loader";
import TeamForm from "./components/TeamForm";
import ScratchGame from "./components/ScratchGame";

function App() {

  const [players, setPlayers] = useState([]);
  const [loader, setLoader] = useState(false)
  const [teams, setTeams] = useState([])


const handlePlayerCreation = useCallback(async (player) => {
  try {
    setLoader(true)
    const newPlayer = await createPlayer(player);
    console.log(newPlayer)
    setLoader(false)
  } catch (error) {
    console.error("Failed to create player:", error.message);
    setLoader(false)
    throw error; 
  }
}, []);

  async function loadPlayers() {
    try {
      setLoader(true)
      const players = await getPlayers();

      setPlayers(players)
      setLoader(false)

    } catch (error) {
      console.error("Failed to load players:", error.message);
      setLoader(false)
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
    loadTeams()
   
  } catch (error) {
    console.error("Failed to generate teams:", error.message);

  }
}

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


  const tabData = [
    {
      label: 'Create Team',
      content: <> <PlayerForm handlePlayerCreation={handlePlayerCreation} />
        <PlayerList players={players} handlePlayerDeletion={handlePlayerDeletion}/>
        <Button
          onClick={handleTeamGeneration}
          varient="primary"
          disabled={!players.length}
        >
       Generate Teams
        </Button>
      </>
    },
    {
      label: 'Team List',
      content: <TeamList teamData={teams}/>
    },
     {
      label: 'Create Team',
      content: <TeamForm/>
    },
     {
      label: 'Lottery',
      content:<ScratchGame/>
    }

  ];

  useEffect(() => {
    loadPlayers()
  }, [handlePlayerCreation, handlePlayerDeletion])

  if(loader){
    return <Loader fullPage/>
  }
  return (
    <>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
        <Tabs tabs={tabData}/>
      </div>

    </>
  );
}

export default App;
