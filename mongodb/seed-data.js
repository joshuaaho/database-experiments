db.adminCommand({
  replSetInitiate: {
    _id: "rs0",
    members: [{ _id: 0, host: "localhost:27017" }],
  },
});

db = connect("mongodb://localhost:27017/?replicaSet=rs0");

db.test1.insertMany([
  {
    food: "tomatoes",
    stock: 0,
  },
]);

db.test2.insertMany([
  {
    name: "tomatoes",
  },
]);

db.test3.insertMany([
  {
    name: "John",
    on_call: true,
  },
  {
    name: "Mary",
    on_call: true,
  },
]);

db.test4.insertMany([
  {
    value: "0",
  },
  {
    value: "0",
  },
  {
    value: "0",
  },
  {
    value: "0",
  },
]);
