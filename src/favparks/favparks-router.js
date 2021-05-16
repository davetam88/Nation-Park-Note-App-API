const path = require('path')
const express = require('express')
const xss = require('xss')
const logger = require('../logger')
const FavparksService = require('./favparks-service')
const { getFavparkValidationError } = require('./favparks-validator')

const favparksRouter = express.Router()
const jsonParser = express.json()


// for / get and post 
favparksRouter
  .route('/')
  .get((req, res, next) => {

    FavparksService.getAllFavparks(
      req.app.get('db')
    )
      .then(favparks => {
        res.json(favparks.map(serializeFavpark))
        res.json(favparks)
      })
      .catch(next)
  })

  .post(jsonParser, (req, res, next) => {
    const {
      userid,
      parkCode,
      stateCode,
      parkName,
      rating,
      note,
      stateName,
      activity,
      parkNumber
    } = req.body

    // required fields
    const newFavpark = {
      userid,
      parkCode,
      // stateCode,
      // parkName,
      // rating,
      // note,
      // stateName,
      // activity,
      parkNumber
    }

    // check for required fields
    for (const [key, value] of Object.entries(newFavpark))
    {
      if (value == null)
      {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }

    const error = getFavparkValidationError(newFavpark)

    FavparksService.insertFavpark(
      req.app.get('db'),
      newFavpark
    )
      .then(favpark => {
        // console.log(`favpark :>> `, favpark) ||
        res
          .status(201)
          // .location(`/favparks/${favpark.id}`)
          .location(path.posix.join(req.originalUrl, `/${favpark.id}`))
          .json(favpark)
      })
      .catch(next)
  })

// for / get with route id : get, delete and patch
favparksRouter
  .route('/:favpark_id')
  .all((req, res, next) => {
    FavparksService.getById(
      req.app.get('db'),
      req.params.favpark_id
    )
      .then(favpark => {
        if (!favpark)
        {
          return res.status(404).json({
            error: { message: `Favpark doesn't exist` }
          })
        }
        res.favpark = favpark // save the favpark for the next middleware
        next() // don't forget to call next so the next middleware happens!
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeFavpark(res.favpark))
  })
  .delete((req, res, next) => {
    FavparksService.deleteFavpark(
      req.app.get('db'),
      req.params.favpark_id
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { name, content } = req.body
    const favparkToUpdate = { name, content }

    const numberOfValues = Object.values(favparkToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
    {
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'title' or 'url'`
        }
      })
    }
    // const error = getFavparkValidationError(favparkToUpdate)
    // if (error) return res.status(400).send(error)

    FavparksService.updateFavpark(
      req.app.get('db'),
      req.params.favpark_id,
      favparkToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })


module.exports = favparksRouter

