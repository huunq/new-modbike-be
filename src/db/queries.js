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
        .orderBy("bicycle.bike_name");
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
        .where("bicycle.bike_id", id)
        .first();
    },
    borrowBike: function (id) {
      return knex("bicycle")
        .where("bike_name", id)
        .update({ is_available: "no" })
        .returning("*");
    },
    returnBike: function (id) {
      return knex("bicycle")
        .where("bike_name", id)
        .update({ is_available: "yes" })
        .returning("*");
    },
    createBike: function (data) {
      return knex("bicycle").insert(data).returning("*");
    },
    editBike: function (id, data) {
      return knex("bicycle").where("bike_name", id).update(data).returning("*");
    },
    removeBike: function (id) {
      return knex("bicycle").where("bike_id", id).del();
    },
  },
  history: {
    getAllHistory: function (id) {
      return knex("history")
        .join("bicycle", "bicycle.bike_name", "=", "history.bike_id")
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
  bikeType: {
    allType: function () {
      return knex("bicycletype").orderBy("bike_type_id");
    },
  },
  branchs: {
    allB: function () {
      return knex("branch").orderBy("branch_id");
    },
  },
};
