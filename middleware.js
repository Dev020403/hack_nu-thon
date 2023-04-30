import express from 'express';
import xml2js from 'xml2js';

const app = express()
const parser = new xml2js.Parser()

app.use(express.json())

app.use((req, res, next) => {
  if (req.headers['content-type'] === 'application/xml') {
    let xmlData = ''

    req.on('data', (chunk) => {
      xmlData += chunk
    })

    req.on('end', () => {
      parser.parseString(xmlData, (err, result) => {
        if (err) {
          console.error(err)
          res.status(400).send('Invalid XML data')
        } else {
          req.body = result
          next()
        }
      })
    })
  } else {
    next()
  }
})

app.post('/api/data', (req, res) => {
  // Process the JSON data in req.body
  console.log(req.body)
  res.send('Data received')
})

app.listen(3000, () => console.log('Server started'))
