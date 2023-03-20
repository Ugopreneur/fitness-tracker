import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [players, setPlayers] = useState([]);
  const [team, setTeam] = useState({});

  useEffect(() => {
    const fetchPlayers = async () => {
      const options = {
        method: "GET",
        url: "https://api-nba-v1.p.rapidapi.com/players",
        params: { team: "1", season: "2021" },
        headers: {
          "X-RapidAPI-Key":
            "d73fe9001amshc84a879808281a3p118f3ejsnc92bedc355cd",
          "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        console.log("Players API response:", response.data);
        setPlayers(response.data.response.slice(0, 10));
      } catch (error) {
        console.error(error);
      }
    };

    const fetchTeams = async () => {
      const options = {
        method: "GET",
        url: "https://api-nba-v1.p.rapidapi.com/teams",
        headers: {
          "X-RapidAPI-Key":
            "d73fe9001amshc84a879808281a3p118f3ejsnc92bedc355cd",
          "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        console.log("Teams API response:", response.data);
        setTeam(response.data.response[4]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlayers();
    fetchTeams();
  }, []);

  return (
    <div>
    
      <h1>First NBA Team</h1>
      {team.name && (
        <div>
          <h2>
            {team.name} - {team.city}
          </h2>
          <img
            src={team.logo}
            alt={`${team.name} logo`}
            style={{ width: "100px" }}
          />
        </div>
      )}

      <h1>NBA Players</h1>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            
            {player.firstname} {player.lastname} - 
            {player.affiliation},
            {player.height.meters} meters, 
            {player.weight.kilograms} kg, 
            NBA start year:{player.nba.start}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
