const FavparkService = {

  getFavparkByUserid(db, userid) {
    return db('favparks')
      .select('*').from('favparks')
      .where('userid', userid)
  },

  getAllFavparks(db) {
    return db('favparks')
      .select('*');
  },

  insertFavpark(db, data) {
    return db('favparks')
      .insert(data)
      .returning('*')
      .then(rows => ({
        ...data, id: rows[0].id
      }))
  },


  getById(db, id) {
    return db('favparks')
      .select('*')
      .where({ id })
      .first();
  },
  // .first, select the first item found.

  deleteFavpark(db, id) {
    return db('favparks')
      .where({ id })
      .delete();
  },

  updateFavpark(db, id, data) {
    return db('favparks')
      .where({ id })
      .update(data);
  },
};

module.exports = FavparkService;



