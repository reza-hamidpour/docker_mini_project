var express = require('express');
var mongoClient = require('mongodb').MongoClient;
var ipObject = require("ip");
// Constants
const mongoServer = process.env.MONGO_URL || 'mongodb://localhost:2701';
const PORT = process.env.PORT || 3000;
var db;

mongoClient.connect(mongoServer, function(err, client){
    if(err){
        console.log("You didn't connect to database.")
    }else{
        db = client.db("messages");
    }
});

// App
const app = express();
app.get('/', (req, res) => {
  var host_ip = ipObject.address();
  message = "<h1>Cloud Computing Class</h1><br>" + 
            "<p>A simple Node.js app.</p><br>" + 
            "<h4 style='color:red;'>Host IP Address:" + host_ip + "</h4>"
  res.send(message);

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


