const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://user01:2JrQ54deKqx2lzs4@cluster0.m9fx58c.mongodb.net/shop?retryWrites=true&w=majority";

// // Solution 1: By course
// const connectDB = (callback) => {
//   MongoClient.connect(uri)
//     .then((client) => {
//       console.log('Connected!');
//       callback(client);
//     })
//     .catch(error => console.log(error))
// }

// // Solution 2: By MongoDB (new version)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let _db;

async function connectDB() {
  try {
    const connect = await client.connect();
    _db = await connect.db();
    // console.log(_db);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

const accessDB = () => {
  if (_db) {
    console.log("You successfully connected to MongoDB!");
    return _db;
  }
  throw 'No database found!';
};

exports.accessDB = accessDB;
exports.connectDB = connectDB;