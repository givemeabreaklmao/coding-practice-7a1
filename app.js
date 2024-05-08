const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')

const dbPath = path.join(__dirname, 'cricketMatchDetails.db')
const app = express()
app.use(express.json())
let database = null
const initializeDbAndServer = async () => {
  try {
    dataBase = await open({
      fileName: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (error) {
    console.log(`Error Message ${error.message}`)
    process.exit(1)
  }
}

initializeDbAndServer()
const convertPlayerObjToResponseObj = DbObject => {
  return {
    playerId: player_id,
    playerName: player_name,
  }
}

//Get all players in table

app.get('/players/', async (request, response) => {
  const getAllPlayersQuery = `
    SELECT * FROM player_details;
    `
  const allPlayersArray = await database.all(getAllPlayersQuery)
  response.send(
    allPlayersArray.map(player => {
      convertPlayerObjToResponseObj(player)
    }),
  )
})

module.exports = app
