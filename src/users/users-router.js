const path = require('path')
const express = require('express')
const xss = require('xss')
const logger = require('../logger')
const UsersService = require('./users-service')
const usersRouter = express.Router()
const jsonParser = express.json()

const serializeUser = user => ({
  id: user.id,
  userid: user.userid,
  username: xss(user.username),
  password: xss(user.password),
})

// for / get and post 
usersRouter
  .route('/')
  .get((req, res, next) => {
    UsersService.getAllUsers(
      req.app.get('db')
    )
      .then(users => {
        res.json(users.map(serializeUser))
      })
      .catch(next)
  })

  .post(jsonParser, (req, res, next) => {
    const { userid, username, password } = req.body
    const newUser = { userid, username, password }

    // check for required fields
    for (const [key, value] of Object.entries(newUser))
    {
      if (value == null)
        // {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
    }

    // newUser.modified = modified;

    UsersService.insertUser(
      req.app.get('db'),
      newUser
    )
      .then(user => {
        // console.log(`user :>> `, user) ||
        res
          .status(201)
          // .location(`/ users / ${ user.id }`)
          .location(path.posix.join(req.originalUrl, `/ ${user.id}`))
          .json(user)
      })
      .catch(next)
  })

// for path / id :  get, delete and patch
usersRouter
  .route('/:user_id')
  .all((req, res, next) => {
    // console.log(`2 user :>> `, user) ||
    UsersService.getById(
      req.app.get('db'),
      req.params.user_id
    )
      .then(user => {
        if (!user)
        {
          return res.status(404).json({
            error: { message: `User doesn't exist` }
          })
        }
        res.user = user // save the user for the next middleware
        next() // don't forget to call next so the next middleware happens!
      })
      .catch(next)
  })

  .get((req, res, next) => {
    res.json({
      id: res.user.id,
      title: xss(res.user.title), // sanitize title
      url: xss(res.user.url), // sanitize url
      description: xss(res.user.description), // sanitize description
      rating: res.user.rating,
    })
  })

  .delete((req, res, next) => {
    UsersService.deleteUser(
      req.app.get('db'),
      req.params.user_id
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  })

  .patch(jsonParser, (req, res, next) => {
    const { title, url } = req.body
    const userToUpdate = { title, url }

    const numberOfValues = Object.values(userToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
    {
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'title' or 'url'`
        }
      })
    }
    const error = getUserValidationError(userToUpdate)
    if (error) return res.status(400).send(error)

    UsersService.updateUser(
      req.app.get('db'),
      req.params.user_id,
      userToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })


module.exports = usersRouter

