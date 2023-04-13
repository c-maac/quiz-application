const express = require('express')
const app = express()
const port = 3000
const fetch = require('node-fetch')

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Quiz application listening on port ${port}`)
})

app.get('/questions', async (request,response) => {

  const apiResponse = await fetch('https://opentdb.com/api.php?amount=1')
  const jsonResponse = await apiResponse.json()
  response.json(jsonResponse);

  //TODO Error handling - other than 0 response means error -
})


