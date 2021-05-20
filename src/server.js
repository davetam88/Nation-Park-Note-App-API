const knex = require('knex')
const app = require('./app')
const { PORT, DATABASE_URL } = require('./config')


const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
})

// Using app.set('property-name', 'property-value') we 
// can set a property called 'db' and set the Knex instance as the value.
app.set('db', db)

// function searchByName(searchTerm) {
//   db
//     .select('*')
//     .from('shopping_list')
//     .where('name', 'ILIKE', `%${searchTerm}%`)
//     .then(result => {
//       console.log('SEARCH TERM', { searchTerm })
//       console.log(result)
//     })
// }


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
});

