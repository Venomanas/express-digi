
// basic

// app.get("/", (req, res) => {
//   res.send("hellos amigos");
// });
// app.get("/twitter", (req, res) => {
//   res.send(" Anas.com");
// });

// app.get("/ice-tea", (req, res) => {
//   res.send("hello from Anas and his tea");
// });

import express from "express";

const app = express();
const port = 3000;
app.use(express.json());

let teaData = [];
let nextId = 1;

app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

app.get("/teas/:id", (req, res) => {
  const tea = teaData.find(t => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  res.status(200).send(tea);
});

//update 

app.put('/teas/:id',(req, res) => {
 const tea = teaData.find(t => t.id === parseInt(req.params.id));
 if(!tea){
   return res.status(404).send('Tea not found');
 }
 const {name, price} = req.body;
 tea.name = name
 tea.price = price
 res.send(200).send(tea)
})

// delete
// we cannot delete the tea data because there is a different way of writing it ( " we need to apply findIndex instead of find ike other operation ")
app.delete('/teas/:id',(req, res) => {
  const teaIndex = teaData.findIndex(t => t.id === parseInt(req.params.id));
  if(teaIndex === -1){
    return res.status(404).send('Tea not found');
  }
  teaData.splice(teaIndex, 1);
  res.send(204).send();
})


app.listen(port, () => {
  console.log(`Server listening on port: ${port}....`);
});