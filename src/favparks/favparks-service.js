const FavparkService = {
  getAllFavparks(db) {
    return db('favparkful_favparks')
      .select('*');
  },

  insertFavpark(db, data) {
    return db('favpark')
      .insert(data)
      .returning('*')
      .then(rows => ({
        ...data, id: rows[0].id
      }))
  },

  getById(db, id) {
    return db('favpark')
      .select('*')
      .where({ id })
      .first();
  },
  // .first, select the first item found.

  deleteFavpark(db, id) {
    return db('favpark')
      .where({ id })
      .delete();
  },

  updateFavpark(db, id, data) {
    return db('favpark')
      .where({ id })
      .update(data);
  }
};

module.exports = FavparkService;



