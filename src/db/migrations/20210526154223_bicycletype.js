exports.up = function (knex) {
  return knex.schema.createTable("bicycletype", (table) => {
    table.increments("bike_type_id").primary();
    table.string("bike_type_name", 100);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("bicycleType");
};
