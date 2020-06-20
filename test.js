const mungu = require('./index.js')
require('dotenv').config()

const dbName = 'games'
const collectionName = 'gamez'
const url=`mongodb+srv://evan:${process.env.MONGO_PWD}@cluster0-xsm0c.mongodb.net/${dbName}?retryWrites=true&w=majority`

async function test(){
  const db = await mungu({
    url,
    dbName,
    collectionName,
  })
  await db.set('hi',{hi:'daaee'})
  const d = await db.get('hi')
  console.log(d,typeof d)
  // await db.del('hi')
  // const d2 = await db.get('hi')
  // console.log(d2)
}

test()