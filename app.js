const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
const ejs = require("ejs");
app.use(express.static("public"));

app.set('view engine', 'ejs');



const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://anubhavjaba:Asaurabh@99@jaba-aolqk.mongodb.net/test?retryWrites=true&w=majority/pierDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const formSchema = new mongoose.Schema({
name:String,
email:String,
subject:String,
message:String
});
const data = new mongoose.model("data",formSchema);

app.get("/",function(req,res){
  res.render("index")
});

app.get("/:requested",function(req,res){
const link = req.params.requested;
if (link=="myclients") {
data.find({},function(err,results){
res.render("myclients",{
name:results
});
});
}
else {
  res.render(link)
}
});


app.post("/",function(req,res){
  let name = req.body.name;
const query = new data({
name:req.body.name,
email:req.body.email,
subject:req.body.subject,
message:req.body.message
});
query.save();

res.redirect("/")
});
app.post("/contact",function(req,res){
  let name = req.body.name;
  const query = new data({
  name:req.body.name,
  email:req.body.email,
  subject:req.body.subject,
  message:req.body.message});
query.save();
res.redirect("/")
});
app.listen(process.env.PORT||3000,function(req,res){
  console.log("server is running on port 3000")
});
