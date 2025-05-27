import { useState } from 'react'
import Button from './Button';
import Input from './Input';
import Text from './Text';
import SelectPicker from './SelectPicker';
import { FiMeh, FiStar, FiUserCheck } from 'react-icons/fi';
import styled from 'styled-components';


const options = [
    { value: 'Pro', label: 'Pro', icon: <FiStar color="#8A2BE2"/> },
    { value: 'Medium', label: 'Medium', icon:  <FiUserCheck  color="#38A169"/>},
    { value: 'Noob', label: 'Noob', icon: <FiMeh color="#E53E3E"/> },
];

function PlayerForm({ handlePlayerCreation}) {
    const [name, setName] = useState("");
    const [level, setLevel] = useState("Pro");

    const handleSubmit = () => {
     handlePlayerCreation({name, level})
    };

    return (
        <>
            <Text variant="h2">Add Player</Text>
            <Wrapper>
                <Wrapper>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Player name"
                        fullWidth
                    />
                </Wrapper>
                <Wrapper>
                    <SelectPicker
                        value={level}
                        onChange={setLevel}
                        options={options}
                    />
                </Wrapper>
               
                <Button
                    varient="primary"
                    onClick={handleSubmit}
                >
                    Add Players
                </Button>
            </Wrapper>
        </>
    );
}

const Wrapper = styled.div`
margin: 10px 0px
`

export default PlayerForm