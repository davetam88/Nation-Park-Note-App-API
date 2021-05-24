const knex = require('knex')
const app = require('../src/app')

describe('Users Endpoints', function () {
  let db

  before('make knex instance', () => {

    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)

  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db.raw('TRUNCATE users RESTART IDENTITY CASCADE'))

  afterEach('cleanup', () => db.raw('TRUNCATE users RESTART IDENTITY CASCADE'))

  describe(`GET /api/users`, () => {
    context(`Given no users`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/users')
          .expect(200, [])
      })
    })


    describe(`GET /api/users/:user_id`, () => {
      context(`Given no users`, () => {
        it(`responds with 404`, () => {
          const userId = 123456
          return supertest(app)
            .get(`/api/users/${userId}`)
            .expect(404, { error: { message: `User doesn't exist` } })
        })
      })

    })

    describe(`DELETE /api/users/:user_id`, () => {
      context(`Given no users`, () => {
        it(`responds with 404`, () => {
          const userId = 123456
          return supertest(app)
            .delete(`/api/users/${userId}`)
            .expect(404, { error: { message: `User doesn't exist` } })
        })
      })
    })

    describe(`PATCH /api/users/:user_id`, () => {
      context(`Given no users`, () => {
        it(`responds with 404`, () => {
          const userId = 123456
          return supertest(app)
            .delete(`/api/users/${userId}`)
            .expect(404, { error: { message: `User doesn't exist` } })
        })
      })
    })
  })
})

