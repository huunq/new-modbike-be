exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("branch")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("branch").insert([
        { branch_id: 1, branch_name: "บางมด" },
        { branch_id: 2, branch_name: "บางขุนเทียน" },
        { branch_id: 3, branch_name: "ราชบุรี" },
      ]);
    });
};
