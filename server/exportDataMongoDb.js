const { MongoClient } = require('mongodb')
const fs = require('fs')

async function exportAllCollections() {
  const uri = 'mongodb://localhost:27017/petAmediateka'
  const client = new MongoClient(uri)

  try {
    await client.connect()
    const database = client.db()
    const collections = await database.listCollections().toArray()

    if (!collections.length) {
      console.log('База данных существует, но коллекций нет!')
      return
    }

    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name
      const collection = database.collection(collectionName)
      const data = await collection.find({}).toArray()

      fs.writeFileSync(`src/data/export_${collectionName}.json`, JSON.stringify(data, null, 2))
      console.log(`✅ Экспортирована коллекция: ${collectionName} (${data.length} документов)`)
    }
  } finally {
    await client.close()
  }
}

exportAllCollections().catch(console.error)
