exports.seed = function (knex) {
  return knex("bicycletype")
    .del()
    .then(function () {
      return knex("bicycletype").insert([
        { bike_type_id: 1, bike_type_name: "จักรยานแม่บ้าน Green Bike" },
        { bike_type_id: 2, bike_type_name: "จักรยานไฮบริดTiger สีส้ม" },
        { bike_type_id: 3, bike_type_name: "จักรยานเสือภูเขาTiger สีเงิน" },
        { bike_type_id: 4, bike_type_name: "จักรยานสถานี" },
      ]);
    });
};
