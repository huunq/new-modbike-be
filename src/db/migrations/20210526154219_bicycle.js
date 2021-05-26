exports.up = function (knex) {
  return knex.schema.createTable("bicycle", (table) => {
    table.increments("bike_id").primary();
    table.string("bike_name", 100);
    table.string("bike_type_id", 50);
    table
      .enum("is_available", ["yes", "no", "fix"])
      .notNullable()
      .defaultTo("yes");
    table.string("detail", 1000);
    table.string("bike_pic", 1000);
    table.string("bike_eq", 100);
    table.string("branch_id", 100);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("bicycle");
};
