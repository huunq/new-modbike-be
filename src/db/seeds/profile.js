exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("profile")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("profile").insert([
        {
          student_id: "admin",
          f_name: "admin",
          l_name: "admin",
          is_admin: true,
        },
      ]);
    });
};
