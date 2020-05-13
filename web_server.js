var express = require('express');
var mongoClient = require('mongodb').MongoClient;
// Constants
const mongoServer = process.env.MONGO_URL || 'mongodb://localhost:27017';
const PORT = process.env.PORT || 3000;
var db;

mongoClient.connect(mongoServer, function(err, client){
    if(err) throw err;
    db = client.db("messages");

});
// App
const app = express();
app.get('/', (req, res) => {
  res.send('A simple Node.js app.');
  res.send('Cloud Computing Class');
});

app.get("/student/:id", function(req, res){
    res.send("<h1> Cload Computing</h1><br><h3 style='color:red;'>Your Student Id is :" + req.params.id + "</h3>");
});

app.get("/addmsg/:stuid/:msg", function(req, res){
    
    add_new_message(req.params.stuid, req.params.msg);
    res.send("Your message saved successfully.");
});

app.get("/msgs/", async function(req,res){
    var messages = await get_all_messages();
    res.json(messages);

});
function add_new_message(your_id, message){
    message = {"student_id": your_id,
               "message": message};
    var coll = db.collection("messages");
    coll.insert(message,function(err){
        if(err) throw err; 
    });

}

async function get_all_messages(){
    var coll = db.collection("messages");
    var messages = [];
    messages = await coll.find().toArray();
    return messages;
}

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);


