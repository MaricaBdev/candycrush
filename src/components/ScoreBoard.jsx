import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

const randomUserNames = [
  'Maria',
  'Robert',
  'Andrei',
  'Eustache',
  'Viorel',
  'Cosmina',
  'Mandra',
  'Kiki',
  'Oana',
  'Alexa',
  'CostiForta',
  'Placeholder_001'
]

const ScoreBoard = ({ score }) => {
  const [gameStates,setGameStates] = useState(null)
  const [userName, setUserName] = useState(null)

  const fetchData = async () => {
    const response = await axios.get('https://candycrush-980exnuy4-maricabdev.vercel.app/scores')
    const data  = Object.keys(response.data.data).map(item => response.data.data[item])
    setGameStates(data)
  }

  console.log(userName)
  const saveData = async () => {
    const data = {
      username: userName,
      score: score
    }
    axios.post('https://candycrush-980exnuy4-maricabdev.vercel.app/addscore', data)
      .then(response =>  console.log(response))
      .catch(err => console.log(err))
      .then(fetchData)
  }
  
  useEffect(() => {
    fetchData()
    setUserName(randomUserNames[Math.floor(Math.random() * randomUserNames.length)])
  }, [])

    const descendingGameStates = gameStates?.sort((a,b) => b.score - a.score)
  
    return (
      <div className="score-board">
        <span>{userName} Score:</span>
        <span>{score}</span>
        <button onClick={saveData}>Save</button>
        <h2>High Scores:</h2>
        {descendingGameStates?.map((gameState, index) => (
          <div key={{index}}> 
            <h3>{gameState.username}: {gameState.score}</h3>
          </div>
        ))}
      </div>
    )
    
    
  }
  
  export default ScoreBoard