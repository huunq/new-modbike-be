exports.up = function (knex) {
  return knex.schema.createTable("branch", (table) => {
    table.increments("branch_id").primary();
    table.string("branch_name", 500);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("branch");
};
