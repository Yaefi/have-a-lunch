const express = require('express')
const router = express.Router()
const  connection  = require('../../helpers/db.js')

router.get("/data", (req, res) => {
  const sqlQuery = 'SELECT * FROM restaurant'
  connection.query(sqlQuery, (error, data) => {
    if(error) {
      return res.status(500).json({
        error: error.message
      })
    }
    res.json(data)
  })
})

router.get("/data/:district", (req, res) => {
  const district = req.params.district
  const sqlQuery = `SELECT * FROM restaurant WHERE district = '${district}'`
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
