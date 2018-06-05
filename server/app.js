const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json());

 const vstda =[
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];
// add your code here

app.get('/', (req, res)=>{
    res.status(200).json(); 
    
})

app.get('/api/todoitems', (req, res)=>{
    res.send(vstda);
})
app.listen(8484, ()=>{
    console.log('Listening on Port 127.0.0.1:8484. . .');
})

app.get('/api/todoitems/:todoItemId', (req, res)=>{
    const send = req.params.todoItemId;
    const sendData = vstda.filter(function(item){
        
        return item.todoItemId == send
    
    });
        if(!sendData.length){
            res.send('Id not found');
        }

        res.send(sendData[0]);

       
})

app.post('/api/todoitems', (req, res)=>{
      const add = req.body.todoItemId;
      var replace = false;

            for(var i = 0; i < vstda.length; i++){
                if(add == vstda[i].todoItemId){
                    vstda.splice(i, 1, req.body);
                    replace = true;
                
                }
            } 
            if(replace == false){
                vstda.push(req.body);
            }
       
res.status(201).json(req.body);
      

       
})

app.delete('/api/TodoItems/:number', (req, res)=>{
  
  
    for(var i = 0; i < vstda.length; i++){
        const deleet = req.params.number;
        if(deleet == vstda[i].todoItemId){
            const item = vstda[i];
            vstda.splice(i, 1);
        res.status(200).json(item);
        }
    } 
})



module.exports = app;
