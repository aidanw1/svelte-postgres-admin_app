var express = require('express')
var router = express.Router()
const knex = require('../database/client')

const lunchWeekList = [
  {
    lunchWeekId: 1,
    weekOf: '2020-10-05',
    isPublished: true,
  },
  {
    lunchWeekId: 2,
    weekOf: '2020-10-12',
    isPublished: true,
  },
  {
    lunchWeekId: 3,
    weekOf: '2020-10-19',
    isPublished: false,
  },
]

// Create a helper function to select all the rows from the
// lunch_week table
const getLunchWeekList = () => {
  return knex.select().from('lunch_week').orderBy('week_of')
}

router.get('/', function (req, res) {
  res.send(lunchWeekList)
})

router.get('/:lunchWeekId', function (req, res) {
  // convert parameters from string to number
  const id = parseInt(req.params.lunchWeekId)
  // get first matching entity from the list
  const lunchWeek = lunchWeekList.find((x) => x.lunchWeekId === id)

  if (lunchWeek) {
    res.send(lunchWeek)
  } else {
    res.status(404).send()
  }
})

module.exports = router
