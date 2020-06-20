const MongoClient = require('mongodb').MongoClient;

let collection

module.exports = async function({url,dbName,collectionName}){
  try {
    await connect(url,dbName,collectionName)
    return db
  } catch(e){
    log('failed to connect')
    return null
  }
}

async function connect(url,dbName,collectionName) {
  return new Promise((resolve,reject)=>{     
    MongoClient.connect(url, {useUnifiedTopology: true}, function (err, client) {
      if(err) reject(err)
      var database = client.db(dbName)
      collection = database.collection(collectionName)
      resolve()
    });
  })
}

const db={
  set: function(channel,data){
    return new Promise(resolve=>{
      collection.updateOne({channel},{$set:{
        data:JSON.stringify(data),
        channel, updated:unix(),
      }},{upsert:'true'},function(err,doc){
        if(err) {
          log(err)
          return resolve(null)
        }
        else resolve()
      })
    })
  },
  get: function(channel){
    return new Promise(resolve=>{
      collection.findOne({channel},function(err,doc){
        if(err) {
          log(err)
          return resolve(null)
        }
        if(!doc) {
          log('no doc')
          return resolve(null)
        }
        if(!doc.data) {
          log('no data')
          return resolve(null)
        }
        try{
          const d = JSON.parse(doc.data)
          resolve(d)
        } catch(e) {
          log(e)
          resolve(null)
        }
      })
    })
  },
  del: function(channel) {
    return new Promise(resolve=>{
      collection.deleteOne({channel},function(err,doc){
        if(err) {
          log(err)
          return resolve(null)
        }
        else resolve()
      })
    })
  }
}

function unix(){
  return Math.round(Date.now()/1000)
}

function log(e){
  console.log('=> MUNGU ERROR:',e)
}