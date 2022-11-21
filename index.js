const express = require('express')
const app = express()
const port = 3000

const hairdressersRoutes = require('./routes/hairdressers');
app.use('/hairdressers', hairdressersRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})