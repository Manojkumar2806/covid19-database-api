const express = require('express')
const path = require('path')
const sqlite3 = require('sqlite3')
const {open} = require('sqlite')
const app = express()
let db = null
let dbPath = path.join(__dirname, 'covid19India.db')

const initializeDBandServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server runnung at http://localhost:3000')
    })
  } catch (e) {
    console.log(`DB Error ${e.message}`)
    process.exit(1)
  }
}

initializeDBandServer()

//API 1

app.get('/states/', async (request, response) => {
  const sqlQuery = `
       SELECT state_id AS stateId, state_name AS stateName, population 
       FROM state;
    `

  const result = await db.all(sqlQuery)
  response.send(result)
})

//API Districts

app.get('/districts/', async (request, response) => {
  const sqlQuery = `
       SELECT * FROM district;
    `
  const result = await db.all(sqlQuery)
  response.send(result)
})

//API 2

app.get('/states/:stateId/', async (request, response) => {
  const {stateId} = request.params
  const sqlQuery = `
       SELECT state_id AS stateId, state_name AS stateName, population 
       FROM state  WHERE state_id = '${stateId}';
  `
  const result = await db.get(sqlQuery)
  response.send(result)
})

//API 3

app.use(express.json())
app.post('/districts/', async (request, response) => {
  const {districtName, stateId, cases, cured, active, deaths} = request.body
  const sqlQuery = `
    INSERT INTO district (district_name, state_id, cases, cured, active, deaths) 
    VALUES ('${districtName}', '${stateId}', '${cases}', '${cured}', '${active}', '${deaths}');
  `
  const result = await db.run(sqlQuery)
  const distric_id = response.lastID
  response.send('District Successfully Added')
})

// API 4
app.get('/districts/:districtId/', async (request, response) => {
  const {districtId} = request.params
  const sqlQuery = `
       SELECT 
          district_id AS districtId,
          district_name AS districtName,
          state_id AS stateId,
          cases,
          cured,
          active,
          deaths 
       FROM  district 
       WHERE district_id = '${districtId}';
  `
  const result = await db.get(sqlQuery)
  response.send(result)
})

// API 5
app.delete('/districts/:districtId/', async (request, response) => {
  const {districtId} = request.params
  const sqlQuery = `
       DELETE FROM district WHERE district_id = '${districtId}';
  `
  await db.run(sqlQuery)
  response.send('District Removed')
})

// API 6
app.put('/districts/:districtId/', async (request, response) => {
  const {districtId} = request.params
  const {districtName, stateId, cases, cured, active, deaths} = request.body
  const sqlQuery = `
    UPDATE district 
    SET district_name = '${districtName}', 
        state_id = '${stateId}', 
        cases = '${cases}', 
        cured = '${cured}', 
        active = '${active}', 
        deaths = '${deaths}' 
    WHERE district_id = '${districtId}';
  `

  await db.run(sqlQuery)
  response.send('District Details Updated')
})

//API 7
app.get('/states/:stateId/stats/', async (request, response) => {
  const {stateId} = request.params
  const sqlQuery = `
    SELECT SUM(cases) AS totalCases, 
           SUM(cured) AS totalCured, 
           SUM(active) AS totalActive, 
           SUM(deaths) AS totalDeaths
    FROM district
    WHERE state_id = '${stateId}';
  `

  const result = await db.get(sqlQuery)
  response.send(result)
})

// API 8
app.get('/districts/:districtId/details/', async (request, response) => {
  const {districtId} = request.params
  const sqlQuery = `
    SELECT state.state_name AS stateName 
    FROM state 
    INNER JOIN district ON state.state_id = district.state_id 
    WHERE district.district_id = '${districtId}';
  `
  const result = await db.get(sqlQuery)
  response.send(result)
})

module.exports = app
