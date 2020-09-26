const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID;
const cors = require('cors')
const uri = 'mongodb+srv://admin:pass@cluster0-hqmi4.gcp.mongodb.net/test?retryWrites=true&w=majority'
const database = 'mean2020'
const users = 'users'
const items = 'items'
const app = express()
const client = new MongoClient(uri, { useUnifiedTopology: true })


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('<h1>Welcome to My API!</h1>')
})

app.get('/books/view', (req, res) => {
  if (req.query.name != undefined) {
    let user = { 'user': req.query.name }
    console.log(user)
    conn.collection('books').find(user).toArray((err, result) => {
      console.log(result)
      if (result) {
        res.send(result)
      }
    })
  } else {
  conn.collection('books').find().toArray((err, result) => {
    console.log(result)
    if (result) {
      res.send(result)
    }
  })
  }
})

app.post('/books/add', (req, res) => {
  const data = req.body

  conn.collection('books').insertMany([data], (err, result) => {
    if ([data].length == result.insertedCount) {
      res.send({ 'status': true })
    }
    else { 
      res.send({ 'status': false })
    }
  })
})

app.post('/profile/edit', (req, res) => {
  const identity = req.body
  console.log(identity._id)
  var o_id = new ObjectId(identity._id);
  conn.collection(users).find({_id: o_id}).toArray((err, result) => {
    updateUser(users, result, identity, res)
  })

})

app.get('/getData', (req, res) => {
  const identity = req.query
  console.log(identity)
  getList(items, identity, res)
})

app.get('/getNewData', (req, res) => {
  const identity = req.query
  console.log(identity)
  getNewList(items, identity, res)
})

app.post('/signup', (req, res) => {
  let user = req.body.user
  let pass = req.body.password
  let name = req.body.name
  let email = req.body.email
  let phone = req.body.phone
  let city = req.body.city
  let state = req.body.state
  console.log(req.body)
  if (user != '' && pass != '') {
    let abc = [{
      'name': name,
      'user': user,
      'pass': pass,
      'email': email,
      'phone': phone,
      'city': city,
      'state': state
    }]
    console.log(abc)
    if (abc.user != '') {
      signup(users, abc, res)
    } else {
      res.send({ status: false })
    }
  }

})

app.post('/login', (req, res) => {
  const user = req.body.user
  const pass = req.body.pass
  console.log(req.body)
  if (user != '' && pass != '') {
    let abc = {
      'user': user,
      'pass': pass
    }
    findData(users, abc, res)
  }

})

app.post('/Add', (req, res) => {
  const user = req.body.user
  const item = req.body.item

  if (user != '' && item != '') {
    addData = {
      'user': user,
      'item': item
    }
  }
  console.log(addData)
  insertData(items, addData, res)
})


app.post('/delete', (req, res) => {
  const user = req.body.user
  const item = req.body.item

  if (user != '' && item != '') {
    delData = {
      'user': user,
      'item': item
    }
  }
  console.log(delData)
  deleteData(items, delData, res)
})

function getList(colName, identity, res) {
  conn.collection(colName).find(identity).toArray((err, result) => {
    let returnobj = []
    for (let i = 0; i < (result.length); i++) {
      returnobj.push({ 'item': result[i] ? result[i].item : '' });
    }
    res.send(returnobj)
  })
}

function getNewList(colName, identity, res) {
  setTimeout(() => {
    conn.collection(colName).find(identity).toArray((err, result) => {
      let returnobjNew = []
      for (let i = 0; i < (result.length); i++) {
        returnobjNew.push({ 'item': result[i] ? result[i].item : '' });
      }
      console.log(returnobjNew[returnobjNew.length - 1])
      res.send(returnobjNew[returnobjNew.length - 1])
    })
  }, 500);
}

function findData(colName, data, res) {
  conn.collection(colName).find(data).toArray((err, result) => {
    console.log(result);
    if (result && result[0] && data.user === result[0].user && data.pass === result[0].pass) {
      resObj = {
        'id': result[0]._id,
        'name': result[0].name ? result[0].name : '',
        'user': result[0].user ? result[0].user : '',
        'email': result[0].email ? result[0].email : '',
        'phone': result[0].phone ? result[0].phone : '',
        'city': result[0].city ? result[0].city : '',
        'state': result[0].state ? result[0].state : '',
        'data': true
      }
      res.send(resObj)
    }
    else {
      res.send(false)
    }
  })
}

function insertData(colName, data, res) {
  conn.collection(colName).insertMany([data], (err, result) => {
    if ([data].length == result.insertedCount) {
      res.send({ 'status': true })
    }
    else {
      res.send({ 'status': false })
    }
    // console.log(result)
    // res.send('hi')
  })
}

function deleteData(colName, data, res) {
  conn.collection(colName).deleteMany(data).then(result => {
    console.log(`Deleted ${result} item(s).`)
    if (result > 0) {
      res.send(true)
    } else {
      res.send(false)
    }
  }).catch(err =>
    console.error(`Delete failed with error: ${err}`)
  )
}

function signup(colName, data, res) {
  user = { user: data[0].user }
  console.log(user)
  conn.collection(colName).find(user).toArray((err, result) => {
    if (result.length > 0) {
      res.send({ status: false })
    } else {
      conn.collection(colName).insertMany(data, (err, result) => {
        if (data.length == result.insertedCount) {
          res.send({ status: true })
        } else {
          res.send({ status: false })
        }
      })
    }
  })
}



function deleteData(colName, data, res) {
  conn.collection(colName).deleteMany(data, (err, result) => {
    if (result.deletedCount > 0) {
      res.send({ 'status': 'ok' })
    }
    else {
      res.send({ 'status': 'fail' })
    }
  })
}

function updateUser(colName, data, newData, res) {
  const changes ={
    name: newData.name,
    email: newData.email,
    phone: newData.phone,
    city: newData.city,
    state: newData.state
  }
  console.log(changes)
  let dataChange = {
    '$set': changes
  }
  console.log(data)
  console.log(dataChange)
  conn.collection(colName).updateOne(data[0], dataChange, (err, result) => {
    console.log('matched count:', result.matchedCount)
    console.log('rows modified:', result.nModified)
    // console.log(result)
    if (result.matchedCount > 0) {
      if (result.result.nModified == 1) {
        res.send({ 'status': true, 'updatedData': changes})
      }
      else {
        res.send({ 'status': false })
      }
    }
    else {
      res.send({ 'status': false })
    }
  })
}

app.listen(8080, () => {
  client.connect(err => {
    if (err)
      throw err
    else {
      conn = client.db(database)
      console.log('Server on 8080')
    }
  })
})
