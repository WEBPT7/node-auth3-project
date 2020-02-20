exports.seed = function(knex) {
  // Deletes ALL existing entries
  return (
    knex("users")
      // .del()
      .then(function() {
        // Inserts seed entries
        return knex("users").insert([
          {
            username: "rowUsername11",
            department: "rowDepartment1",
            password: "rowPassword1"
          },
          {
            username: "rowUsername21",
            department: "rowDepartment2",
            password: "rowPassword2"
          },
          {
            username: "rowUsername31",
            department: "rowDepartment3",
            password: "rowPassword3"
          },
          {
            username: "rowUsername41",
            department: "rowDepartment4",
            password: "rowPassword4"
          }
        ]);
      })
  );
};
