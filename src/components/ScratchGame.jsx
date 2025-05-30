import React, { useState } from 'react';
import styled from 'styled-components';
import Input from './Input';
import Button from './Button';
import Text from './Text';

const ScratchGame = () => {
    const [numBoxes, setNumBoxes] = useState(5);
    const [boxes, setBoxes] = useState([]);
    const [result, setResult] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);

    // Initialize the game with hidden values
    const startGame = () => {
        let result = Array.from({ length: numBoxes }, (_, index) =>
            index === 1 ? "PASS" : "FAIL"
        );
        const shuffled = [...result].sort(() => Math.random() - 0.5).slice(0, numBoxes);

        setBoxes(shuffled.map(value => ({
            value,
            scratched: false
        })));
        setResult(null);
        setGameStarted(true);
    };

    // Handle scratching a box
    const scratchBox = (index) => {
        if (!gameStarted || boxes[index].scratched) return;

        const newBoxes = [...boxes];
        newBoxes[index].scratched = true;
        setBoxes(newBoxes);

        // Check if this is the "F" (Finalist) box
        if (newBoxes[index].value === "PASS") {
            setResult("WINNER! This team advances to the next round!");
        }
    };

    return (
        <GameContainer>
            <Text variant="h2">Tournament Lottery</Text>

            {!gameStarted ? (
                <Wrapper>
                    <Wrapper>
                        Number of boxes:
                        <Input
                            type="number"
                            value={numBoxes}
                            onChange={(e) => setNumBoxes(parseInt(e.target.value))}

                        />
                    </Wrapper>
                    <Wrapper>
                        <Button variant="primary" onClick={startGame}>Start Game</Button>
                    </Wrapper>
                </Wrapper>
            ) : (
                <>
                    <BoxesContainer>
                        {boxes.map((box, index) => (
                            <ScratchBox
                                key={index}
                                scratched={box.scratched}
                                onClick={() => scratchBox(index)}
                            >
                                {box.scratched ? box.value : "?"}
                            </ScratchBox>
                        ))}
                    </BoxesContainer>

                    {result && (
                        <ResultPopup>
                            <h3>{result}</h3>
                            <button onClick={() => setGameStarted(false)}>Play Again</button>
                        </ResultPopup>
                    )}

                    <ScratchInstructions>
                        <p>Rub each box to reveal if the team will go to next round (PASS) or Play (FAIL)</p>
                        <p>Find the "PASS" to see which team advances to the Next Round!</p>
                    </ScratchInstructions>
                </>
            )}
        </GameContainer>
    );
};

// Styled Components
const GameContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
`;

const BoxesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 30px 0;
`;

const ScratchBox = styled.div`
  width: 80px;
  height: 80px;
  background-color: ${props => props.scratched ? '#f0f0f0' : '#333'};
  color: ${props => props.scratched ? '#333' : '#f0f0f0'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ResultPopup = styled.div`
  margin: 20px 0;
  padding: 15px;
  background-color: #4CAF50;
  color: white;
  border-radius: 8px;
  
  button {
    margin-top: 10px;
    padding: 8px 15px;
    background-color: white;
    color: #4CAF50;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const ScratchInstructions = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 8px;
`;

const Wrapper = styled.div`
margin: 10px 0px
`

export default ScratchGame;