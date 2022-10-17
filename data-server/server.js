const express = require('express');
const cors = require('cors');
const PORT = 3001;

const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// mysql router
const dataRouter = require('./routes/data');
app.use('/data', dataRouter);

// mongo router
const mongoRouter = require('./routes/mongo');
app.use('/mongo', mongoRouter);

app.listen(PORT, () => {
  console.log(`데이터 통신 서버가 ${PORT}에서 작동 중입니다. `);
});
