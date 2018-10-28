const express = require("express");
const app = express();
let port = process.env.PORT || 8000;
const fs = require("fs");
let bodyParser = require("body-parser")
app.use(bodyParser.json());

app.post("/users", (req, res) => {
  let storage = fs.readFileSync(__dirname + "/storage.json", "utf8");
    let dataArr = JSON.parse(storage);
    let userObj = ({
      name: req.body.name,
      email: req.body.email,
      state: req.body.state
    })
    dataArr.push(userObj)
    fs.writeFileSync(__dirname + "/storage.json", JSON.stringify(dataArr));
    res.send(userObj)
})

app.get("/allusers", (req, res) => {
  let storage = fs.readfileSync(__dirname + "/storage.json", "utf8");
  let dataArr = JSON.parse(storage);
  res.send(dataArr)
})

app.get("/user/:name", (req, res) =>{
let storage = fs.readfileSync( __dirname + "/storage.json", "utf8");
let dataArr = JSON.parse(storage);
let name = req.params.name
  for(let i = 0; i < dataArr.length; i++){
    if(dataArr[i].name === name){
      res.send(dataArr[i])
    }
  }
})

app.patch("/update/:name", (req, res) =>{
  let storage = fs.readfileSync( __dirname + "/storage.json", "utf8");
  let dataArr = JSON.parse(storage);
  let name = req.params.name
    for(let i = 0; i < dataArr.length; i++){
      if(dataArr[i].name === name){
        dataArr[i] = req.body
      }
    }
    fs.writeFileSync(__dirname + "/storage.json", JSON.stringify(dataArr));
    res.send(dataArr)

})

app.delete("/delete/:name", (req, res) =>{
  let storage = fs.readfileSync( __dirname + "/storage.json", "utf8");
  let dataArr = JSON.parse(storage);
  let name = req.params.name
    for(let i = 0; i < dataArr.length; i++){
      if(dataArr[i].name === name){
        dataArr[i] = null;
      }
    }
    fs.writeFileSync(__dirname + "/storage.json", JSON.stringify(dataArr));
    res.send(null);
})


app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
