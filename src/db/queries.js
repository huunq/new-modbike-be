const knex = require("./knex");

module.exports = {
  bicycle: {
    getAllBike: function () {
      return knex("bicycle")
        .join(
          "bicycletype",
          "bicycletype.bike_type_id",
          "=",
          "bicycle.bike_type_id"
        )
        .join("branch", "branch.branch_id", "=", "bicycle.branch_id")
        .orderBy("bicycle.bike_id");
    },
    getBikeById: function (id) {
      return knex("bicycle")
        .join(
          "bicycletype",
          "bicycletype.bike_type_id",
          "=",
          "bicycle.bike_type_id"
        )
        .join("branch", "branch.branch_id", "=", "bicycle.branch_id")
        .where("bicycle.bike_name", id)
        .first();
    },
    borrowBike: function (id) {
      return knex("bicycle")
        .where("bike_id", id)
        .update({ is_available: false })
        .returning("*");
    },
    returnBike: function (id) {
      return knex("bicycle")
        .where("bike_id", id)
        .update({ is_available: "yes" })
        .returning("*");
    },
    editBike: function (id, data) {
      return knex("bicycle").where("bike_id", id).update(data).returning("*");
    },
    removeBike: function (id) {
      return knex("bicycle").where("bike_id", id).del();
    },
  },
  history: {
    getAllHistory: function (id) {
      return knex("history")
        .join("bicycle", "bicycle.bike_id", "=", "history.bike_id")
        .where("history.student_id", id)
        .orderBy("history.start_date", "asc");
    },
    borrowBikeHistory: function (history) {
      return knex("history").insert(history).returning("*");
    },
    returnBikeHistory: function (id, date, ontime) {
      return knex("history")
        .where("history_id", id)
        .update({ finish_date: date, return_ontime: ontime })
        .returning("*");
    },
  },
  user: {
    getPersonalData: function (id) {
      return knex("profile").where("student_id", id).first();
    },
    getAllUsers: function () {
      return knex("profile").orderBy("student_id");
    },
    setPersonalData: function (data) {
      return knex("profile").insert(data).returning("*");
    },
  },
  auth: {
    authLogin: function (user) {
      return knex("user").where("username", user.username).first();
    },
    registerMember: function (user) {
      return knex("user").insert(user).returning("*");
    },
  },
};
