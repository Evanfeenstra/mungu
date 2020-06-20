# mungu

Dead simple Mongo DB

```bash
npm i --save mungu
```

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
  console.log(d)

  await db.del('hi')

  const d2 = await db.get('hi')
  console.log(d2)
}
```

This lib is very simple. It never throws errors (just returns `null` from `get` if there is no document)