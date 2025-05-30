import React, { useEffect, useState, useCallback } from 'react';
import Table from './Table'; // Import the Table component we created earlier
import { deleteTeam, getTeams } from '../fetch';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import styled from 'styled-components';
import Button from './Button';
import Loader from './Loader';
import Text from './Text';
import Popup from './Popup';
import TeamForm from './TeamForm';


const TeamList = () => {

  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedTeamDatum, setSeletedTeamDatum] = useState({})
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  function editTeam(e, datum) {
    setSeletedTeamDatum(datum)
    setIsPopupOpen(true)
  }

  async function loadTeams() {
    try {
      setLoading(true)
      const teams = await getTeams();
      setTeams(teams)
    
      setLoading(false)
    } catch (error) {
      console.error("Failed to load teams:", error.message);
      setLoading(false)
    }
  }

  const handleTeamDeletion = useCallback(async (e, id) => {
    e.stopPropagation()
    try {
      await deleteTeam(id);
    } catch (error) {
      console.error("Failed to delete team:", error.message);
    }
  }, [])

  // Format the columns for the table
  const columns = [
    {
      title: 'PLAYER-1 NAME',
      key: 'player1',
      width: "200",
      render: (record) => {
        if (record.players.length > 0) {
          return (
            <div>
              <span>{record.players[0].name}</span>
              <span style={{
                color: getLevelColor(record.players[0].level),
                marginLeft: '8px',
                fontSize: '0.8em'
              }}>
                ({record.players[0].level})
              </span>
            </div>
          );
        }
        return record.hasVirtualPlayer ? 'Virtual Player' : '-';
      }
    },
    {
      title: 'PLAYER-2 NAME',
      key: 'player2',
       width: "150",
      render: (record) => {
        if (record.players.length > 1) {
          return (
            <div>
              <span>{record.players[1].name}</span>
              <span style={{
                color: getLevelColor(record.players[1].level),
                marginLeft: '8px',
                fontSize: '0.8em'
              }}>
                ({record.players[1].level})
              </span>
            </div>
          );
        }
        return record.hasVirtualPlayer ? 'Virtual Player' : '-';
      }
    },
    {
      title: 'TEAM NAME',
      dataIndex: 'teamName',
      key: 'teamName',
       width: "150",
    },
    {
      title: 'PAIR TYPE',
      dataIndex: 'pairType',
      key: 'pairType',
      render: (pairType) => {
       
        return (<span style={{
          color: getPairTypeColor(pairType.pairType),
          fontWeight: 500
        }}>
          {pairType.pairType}
        </span>)
      }
    },
     {
      title: 'Fee',
      dataIndex: 'fee',
      key: 'fee',
       width: "150",
      render: (render) => {
       
        return (<Text variant="subtitle">
          {render.fee}
        </Text>)
      }
    },
      {
      title: 'Re Entry',
      dataIndex: 'reEntry',
      key: 'reEntry',
      render: (render) => {
     
        return (<Text variant="subtitle">
          {render.reEntry}
        </Text>)
      }
    },
    {
      title: 'ACTIONS',
      dataIndex: 'actions',
      key: 'actions',
       width: "150",
      render: (render) => {

        return (
          <ButtonWrapper>
            <Button
              onClick={(e) => editTeam(e, render)}
              size="small"
              variant="secondary"
            >
              <FiEdit2 />
            </Button>
            <Button
              onClick={(e) => handleTeamDeletion(e, render._id)}
              size="small"
              variant="secondary"
            >
              <FiTrash2 stroke="red" />
            </Button>
          </ButtonWrapper>
        )
      }
    }
  ];

  // Helper function to get color based on player level
  const getLevelColor = (level) => {
   
    switch (level.toLowerCase()) {
      case 'pro': return '#10b981'; // Green
      case 'medium': return '#3b82f6'; // Blue
      case 'noob': return '#ef4444'; // Red
      default: return '#6b7280'; // Gray
    }
  };

  // Helper function to get color based on pair type
  const getPairTypeColor = (pairType) => {
    if (pairType.includes('Pro')) return '#10b981'; // Green
    if (pairType.includes('Medium')) return '#3b82f6'; // Blue
    if (pairType.includes('Noob')) return '#ef4444'; // Red
    if (pairType.includes('Virtual')) return '#8b5cf6'; // Purple
    return '#6b7280'; // Gray
  };

  useEffect(() => {
    loadTeams()
  }, [])

  if (loading) {
    return <Loader />
  }


  return (
    <>
      <Text variant="h2">Team List</Text>
      <Table
        columns={columns}
        data={teams}
        hoverEffect
        bordered
      />
      {isPopupOpen && <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title="Edit Team"
        width="600px"
        animation="slide-up"
      >
        <TeamForm
          data={selectedTeamDatum}
          mode="edit"
        />
      </Popup>}
    </>

  );
};

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px
`
export default TeamList;