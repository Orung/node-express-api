const express = require('express')
const fs = require('fs')
const { toUSVString } = require('util')


const app = express()

//using midleware
app.use(express.json());

const users = JSON.parse(fs.readFileSync(`${__dirname}/data.json`))


app.get('/',  (req, res) => {
  res.status(200).json({
        status : 'success',
        data : {
          allData:users
        }
    })
})
 
app.get('/:id',  (req, res) => {

  // Converting parameters to number
  const id = req.params.id * 1;

  // searching for a particular object in array
  const user = users.find(el => el.id === id);
  if(!user){
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }else{
    res.status(200).json({
          status : 'success',
          data : {
            user
          }          
      })
    }
})


app.post('/', (req, res) =>{
    console.log(req.body)
//creating id and new users
const newId = users[users.length - 1].id + 1;
const newUser = Object.assign({id: newId}, req.body);

users.push(newUser);

fs.writeFile(`${__dirname}/data.json`, JSON.stringify(users), err =>{
  res.status(201)
.json({
  status: 'success',
  data: {
    user : newUser
  }
})})
})



app.patch('/api/:id',  (req, res) =>{
  if( req.params.id * 1 > users.length){
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }else{
    res.status(200).json({
          status : 'success',
          data : {
            users : '<Update ...>'
          }          
      })
    }

  })
  app.delete('/api/:id',  (req, res) =>{
    if( req.params.id * 1 > users.length){
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID'
      })
    }else{
      res.status(204).json({
            status : 'success',
            data : null          
        })
      }
  
    })

app.listen(3000, () => {
    console.log(`Server listening on http://localhost:3000/ Listening to port 3000`)
})