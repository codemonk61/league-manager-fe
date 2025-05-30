import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import styled from 'styled-components';
import SelectPicker from './SelectPicker';
import { FiMeh, FiStar, FiUserCheck } from 'react-icons/fi';
import { addTeam, updateTeam } from '../fetch';
import Text from './Text';

const initialData = {

  players: [
    {
      name: "",
      level: "",
    },
    {
      name: "",
      level: "",
    }
  ],
  combinedStrength: 0,
  teamName: "",
  pairType: "",
  reEntry: 0,
  fee: "",
  hasVirtualPlayer: false
};

const levelOptions = [
  { value: 'Pro', label: 'Pro', icon: <FiStar color="#8A2BE2"/> },
  { value: 'Medium', label: 'Medium', icon: <FiUserCheck color="#38A169"/> },
  { value: 'Noob', label: 'Noob', icon: <FiMeh color="#E53E3E"/> },
];

const feeOptions = [
  { value: 'Paid', label: 'Paid' },
  { value: 'Not Paid', label: 'Not Paid' },
];

const pairTypeOptions = [
  { value: 'Pro-Noob', label: 'Pro-Noob' },
  { value: 'Medium-Medium', label: 'Medium-Medium' },
  { value: 'Pro-Pro', label: 'Pro-Pro' },
  { value: 'Noob-Noob', label: 'Noob-Noob' },
];

const TeamForm = ({ data = null}) => {
  const [teamFormData, setTeamFormData] = useState(data || initialData);

  const handleInputChange = (field, value, playerIndex) => {
    setTeamFormData(prev => {
      // Handle player-specific fields
      if (playerIndex !== undefined && field !== 'level') {
        const updatedPlayers = [...prev.players];
        updatedPlayers[playerIndex] = {
          ...updatedPlayers[playerIndex],
          [field]: value
        };
        return { ...prev, players: updatedPlayers };
      }

      // Handle player level changes
      if (playerIndex !== undefined && field === 'level') {
        const updatedPlayers = [...prev.players];
        updatedPlayers[playerIndex] = {
          ...updatedPlayers[playerIndex],
          level: value,
          
        };
        return { ...prev, players: updatedPlayers };
      }

      // Handle numeric fields
      if (field === 'reEntry') {
        return { ...prev, [field]: Number(value) || 0 };
      }

      // Handle all other fields
      return { ...prev, [field]: value };
    });
  };

  const handleSubmit = async() => {
    try{
        data ? await updateTeam(teamFormData) : await addTeam(teamFormData)
    } catch(e){
        console.log(e)
    }
   
  };

  return (
    <div>
        {!data && <Text variant="h4">Create Team</Text>}
      <Wrapper>
        {/* Player 1 Name */}
        <Wrapper>
          <Input
            type="text"
            value={teamFormData.players[0].name}
            onChange={(e) => handleInputChange('name', e.target.value, 0)}
            placeholder="Player1 name"
            fullWidth
          />
        </Wrapper>

        {/* Player 1 Level */}
        <Wrapper>
          <SelectPicker
            value={teamFormData.players[0].level}
            onChange={(value) => handleInputChange('level', value, 0)}
            options={levelOptions}
            placeholder="Select Player1 level"
          />
        </Wrapper>

        {/* Player 2 Name */}
        <Wrapper>
          <Input
            type="text"
            value={teamFormData.players[1]?.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value, 1)}
            placeholder="Player2 name"
            fullWidth
          />
        </Wrapper>

        {/* Player 2 Level */}
        <Wrapper>
          <SelectPicker
            value={teamFormData.players[1]?.level || ''}
            onChange={(value) => handleInputChange('level', value, 1)}
            options={levelOptions}
            placeholder="Select Player2 level"
          />
        </Wrapper>

        {/* Team Name */}
        <Wrapper>
          <Input
            type="text"
            value={teamFormData.teamName}
            onChange={(e) => handleInputChange('teamName', e.target.value)}
            placeholder="Team Name"
            fullWidth
          />
        </Wrapper>

        {/* Re-Entry */}
        <Wrapper>
          <Input
            type="number"
            value={teamFormData.reEntry}
            onChange={(e) => handleInputChange('reEntry', e.target.value)}
            placeholder="Re Entry"
            fullWidth
          />
        </Wrapper>

        {/* Fee Status */}
        <Wrapper>
          <SelectPicker
            value={teamFormData.fee}
            onChange={(value) => handleInputChange('fee', value)}
            options={feeOptions}
            placeholder="Payment Status"
          />
        </Wrapper>

        {/* Pair Type */}
        <Wrapper>
          <SelectPicker
            value={teamFormData.pairType}
            onChange={(value) => handleInputChange('pairType', value)}
            options={pairTypeOptions}
            placeholder="Select Pair type"
          />
        </Wrapper>

        {/* Submit Button */}
        <Wrapper>
          <Button
            variant="primary"
            onClick={handleSubmit}
          >
            {data ? 'Update Team' : 'Create Team'}
          </Button>
        </Wrapper>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  margin: 10px 0px;
`;

export default TeamForm;