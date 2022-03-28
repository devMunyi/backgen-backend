const pool = require("../../config/db.config");

module.exports = {
  addPlatform: ({ name, description, icon, added_by }, callback) => {
    pool.query(
      `INSERT INTO pr_platforms(name, description, icon, added_by) VALUES(?, ?, ?, ?)`,
      [name, description, icon, added_by],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getPlatforms: ({where_, andsearch, offset, rpp }, callback) => {
    pool.query(
      `SELECT uid, name, description, icon, added_by, added_at, status FROM pr_platforms WHERE ${where_} ${andsearch} ORDER BY name ASC LIMIT ?,?`,
      [offset, rpp],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },



  getTotalRecords: ({where_, andsearch}, callback) => {
    pool.query(
      `SELECT COUNT(uid) AS all_totals FROM pr_platforms WHERE ${where_} ${andsearch}`,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },



  getPlatformByPlatformId: ({where_, platform_id}, callback) => {
    pool.query(
      `SELECT uid, name, description, icon, added_by, added_at FROM pr_platforms WHERE uid = ? AND ${where_}`,
      [platform_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },


  updatePlatform: (id, { name, description, icon, added_by }, callback) => {
    pool.query(
      `UPDATE pr_platforms SET name=?, description=?, icon=?, added_by=? WHERE uid =?`,
      [name, description, icon, added_by, id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  deletePlatform: (id, callback) => {
    pool.query(
      `UPDATE pr_platforms SET status = ? WHERE uid =?`,
      [0, id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  reactivatePlatform: (id, callback) => {
    pool.query(
      `UPDATE pr_platforms SET status = ? WHERE uid =?`,
      [1, id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
