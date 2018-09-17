const express = require('express')
const router = express.Router()
const  connection  = require('../../helpers/db.js')

router.get("/data", (req,res) => {
  const input = "m"
  const sqlQuery = `SELECT * FROM restaurant WHERE name LIKE '%${input}%' OR address LIKE '%${input}%' OR primary_categorisation LIKE '${input}%' OR secondary_categorisation LIKE '%${input}%'`
  connection.query(sqlQuery, (error, data) => {
    if(error) {
      return res.status(500).json({
        error: error.message
      })
    }
    res.json(data)
  })
})

module.exports = router
