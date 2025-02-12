import express from "express";
import { MongoClient } from "mongodb";

const app = express();
const port = 3000;

const client = new MongoClient(
  "mongodb://mongo:27017/?replicaSet=rs0&directConnection=true"
);

app.post("/test1/withTransaction", async (req, res) => {
  console.log("ddd");
  const db = client.db("test");
  const collection = db.collection("test1");

  const session = client.startSession();

  session.startTransaction();

  try {
    const result = await collection.findOneAndUpdate(
      { food: "tomatoes" },
      { $inc: { stock: 1 } },
      { returnOriginal: false, session: session }
    );

    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    session.abortTransaction();
  }

  res.json({});
});

app.post("/test1/withoutTransaction", async (req, res) => {
  const db = client.db("test");
  const collection = db.collection("test1");

  await collection.findOneAndUpdate(
    { food: "tomatoes" },
    { $inc: { stock: 1 } }
  );

  res.json({});
});

app.post("/test1/reset", async (req, res) => {
  const db = client.db("test");
  const collection = db.collection("test1");

  await collection.findOneAndUpdate(
    { food: "tomatoes" },
    { $set: { stock: 0 } } // Use $set to update the stock
  );

  res.end();
});

app.post("/test2/readOp", async (req, res) => {
  console.log("ddd");

  const session = client.startSession();

  session.startTransaction();

  const db = client.db("test");
  const collection = db.collection("test2");
  try {
    await new Promise((r) => setTimeout(r, 3000));

    const result = await collection.findOne(
      { food: "tomatoes" },
      { session: session }
    );

    console.log(`First Read: ${result}`);
    await new Promise((r) => setTimeout(r, 3000));

    const result2 = await collection.findOne(
      { food: "tomatoes" },
      { session: session }
    );
    console.log(`Second Read: ${result2}`);
    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    session.abortTransaction();
  }

  res.json({});
});

app.post("/test2/writeOp", async (req, res) => {
  console.log("ddd");
  const db = client.db("test");
  const collection = db.collection("test2");

  await new Promise((r) => setTimeout(r, 5000));
  await collection.deleteOne({ food: "tomatoes" });
  console.log("Just Deleted Document");

  res.json({});
});

app.post("/test2/reset", async (req, res) => {
  const db = client.db("test");
  const collection = db.collection("test2");

  // Clear the collection
  await collection.deleteMany({});

  // Insert a new document
  await collection.insertOne({ food: "tomatoes" });

  // Respond with an empty JSON object
  res.json({});
});

app.post("/test3/leaveWorkJohn", async (req, res) => {
  const session = client.startSession();

  session.startTransaction();

  const db = client.db("test");
  const collection = db.collection("test3");

  try {
    const cursor = collection.find({}, { session: session });

    console.log("Start timeout");
    await new Promise((r) => setTimeout(r, 3000));

    console.log("Finish timeout");

    if ((await cursor.toArray()).length > 1) {
      await collection.findOneAndDelete(
        { name: "John", on_call: true },
        { session: session }
      );
      console.log("Deleted");
    }

    console.log("Comitting");
    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    console.log("Error");
    session.abortTransaction();
  }

  res.json({});
});

app.post("/test3/leaveWorkMary", async (req, res) => {
  const session = client.startSession();

  session.startTransaction();

  const db = client.db("test");
  const collection = db.collection("test3");

  try {
    const cursor = collection.find({}, { session: session });

    console.log("Start timeout");
    await new Promise((r) => setTimeout(r, 3000));

    console.log("Finish timeout");

    if ((await cursor.toArray()).length > 1) {
      await collection.findOneAndDelete(
        { name: "Mary", on_call: true },
        { session: session }
      );
      console.log("Deleted");
    }

    console.log("Comitting");
    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    console.log("Error");
    session.abortTransaction();
  }

  res.json({});
});

app.post("/test3/reset", async (req, res) => {
  const db = client.db("test");
  const collection = db.collection("test3");

  // Clear the collection
  await collection.deleteMany({});

  // Insert a new document
  await collection.insertMany([
    {
      name: "John",
      on_call: true,
    },
    {
      name: "Mary",
      on_call: true,
    },
  ]);
  console.log("dsd");
  // Respond with an empty JSON object
  res.json({});
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
