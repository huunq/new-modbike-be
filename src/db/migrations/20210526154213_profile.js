exports.up = function (knex) {
  return knex.schema.createTable("profile", (table) => {
    table.string("student_id", 100).primary();
    table.string("f_name", 100);
    table.string("l_name", 100);
    table.string("faculty", 200);
    table.string("department", 200);
    table.boolean("is_canuse").notNullable().defaultTo(true);
    table.string("mobile_no", 50);
    table.string("email", 50);
    table.string("other_contact", 100);
    table.boolean("is_admin").notNullable().defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("profile");
};
