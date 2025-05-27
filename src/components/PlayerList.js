import Button from "./Button";
import Text from "./Text";
import styled from 'styled-components';
import { FiTrash2 } from 'react-icons/fi';

 function PlayerList({players, handlePlayerDeletion}) {
  const removePlayer = (id) => {
    handlePlayerDeletion(id)
  };

  return (
    <PlayerListWapper>
      <Text variant="h2">Players ({players.length})</Text>
      <PlayerListWapper>
        {players.map((player, index) => (
          <PlayerWrapper
            key={index}
          >
            <span>
              {player.name} <span className="text-sm text-gray-500">({player.level})</span>
            </span>
            <Button
              onClick={() => removePlayer(player._id)}
              size="small"
              variant="secondary"
            >
              <FiTrash2 stroke="red"/>
            </Button>
          </PlayerWrapper>
        ))}
      </PlayerListWapper>
    </PlayerListWapper>
  );
}

const PlayerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: .5rem;
 
`;

const PlayerListWapper = styled.div`
  margin: 10px 0px;
`

export default PlayerList