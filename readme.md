# mungu

Dead simple Mongo DB

```js
const url = '***'
const dbName = '***'
const collectionName = '***'

async function test(){
  const db = await mungu({
    url,
    dbName,
    collectionName,
  })
  await db.set('hi',{hi:'deee'})
  const d = await db.get('hi')
  await db.del('hi')
  const d2 = await db.get('hi')
  console.log(d2)
}
```
