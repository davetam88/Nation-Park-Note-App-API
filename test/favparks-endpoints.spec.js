const knex = require('knex')
const app = require('../src/app')

describe('Favparks Endpoints', function () {
  let db

  before('make knex instance', () => {

    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)

  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db.raw('TRUNCATE favparks RESTART IDENTITY CASCADE'))

  afterEach('cleanup', () => db.raw('TRUNCATE favparks RESTART IDENTITY CASCADE'))

  describe(`GET /api/favparks`, () => {
    context(`Given no favparks`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/favparks')
          .expect(200, [])
      })
    })

    describe(`GET /api/favparks/:favpark_id`, () => {
      context(`Given no favparks`, () => {
        it(`responds with 404`, () => {
          const favparkId = 123456
          return supertest(app)
            .get(`/api/favparks/${favparkId}`)
            .expect(404, { error: { message: `Favpark doesn't exist` } })
        })
      })

    })

    describe(`DELETE /api/favparks/:favpark_id`, () => {
      context(`Given no favparks`, () => {
        it(`responds with 404`, () => {
          const favparkId = 123456
          return supertest(app)
            .delete(`/api/favparks/${favparkId}`)
            .expect(404, { error: { message: `Favpark doesn't exist` } })
        })
      })
    })

    describe(`PATCH /api/favparks/:favpark_id`, () => {
      context(`Given no favparks`, () => {
        it(`responds with 404`, () => {
          const favparkId = 123456
          return supertest(app)
            .delete(`/api/favparks/${favparkId}`)
            .expect(404, { error: { message: `Favpark doesn't exist` } })
        })
      })
    })
  })
})

