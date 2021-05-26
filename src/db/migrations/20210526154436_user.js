exports.up = function (knex) {
  return knex.schema.createTable("user", (table) => {
    table.increments("user_id").primary();
    table.string("username", 100);
    table.string("password", 100);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user");
};
