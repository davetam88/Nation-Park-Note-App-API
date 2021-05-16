const UserService = {
  getAllUsers(db) {
    return db('users')
      .select('*');
  },

  insertUser(db, data) {
    return db('users')
      .insert(data)
      .returning('*')
      .then(rows => ({
        ...data, id: rows[0].id
      }))
  },

  getById(db, id) {
    return db('users')
      .select('*')
      .where({ id })
      .first();
  },
  // .first, select the first item found.

  deleteUser(db, id) {
    return db('users')
      .where({ id })
      .delete();
  },

  updateUser(db, id, data) {
    return db('users')
      .where({ id })
      .update(data);
  }
};

module.exports = UserService;


