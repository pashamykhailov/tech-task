const express = require('express');
const router = express.Router();

const sql123 = require('mssql');
const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

mapValues = (item) => `${item}`;

async function sqlPool(sql) {
  let pool = await sql123.connect(sqlConfig);
  global.pool = pool;
  return pool.request().query(sql);
}

// Get new questions
router.get('/', async function (req, res) {
  let result;
  try {
    result = await sqlPool('select * from questions');
    res.status(200).send(result.recordset);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Post new question.
router.post('/', async function (req, res) {
  let result;
  let counterId = 1;
  try {
    let id = await sqlPool('select count(*) from questions');

    if (id.recordset[0][''] > 0) {
      counterId = id.recordset[0][''] += 1;
    }

    let answerCounter = 1;
    let answersId =  await sqlPool('select count(*) from questions_answers');
    if (answersId.recordset[0][''] > 0) {
      answerCounter = answersId.recordset[0][''] += 1;
    }
  
    let answerIds = [];
    let answerValues = '';
    let correctAnswerId;
    req.body.list_of_answers.forEach((item, index) => {
      if (req.body.correct_answer == item) {
        correctAnswerId = answerCounter;
      }
      if (req.body.list_of_answers.length -1 === index) {
        answerValues += `('${item}', ${answerCounter});`
      } else {
        answerValues += `('${item}', ${answerCounter}),`
      }
      answerIds.push(answerCounter);
      answerCounter += 1;
     
    });

    await sqlPool(`insert into questions (text,type,list_of_answers, correct_answer, vote, id) 
    values('${
      req.body.text
    }', '${req.body.type}','${answerIds.map(mapValues)}', '${correctAnswerId}','0','${counterId}')`);
    result = { id: counterId };
    res.status(200).send(JSON.stringify(result));
  } catch (error) {
    result = error;
    console.log('error ', error);
    res.status(400).send(JSON.stringify(result));
  }
});

// VOte question
router.put('/vote', async function (req, res) {
  let result;
  try {
    let id = req.body.id;
    let voteId = req.body.vote;
    let vote = await sqlPool(`select vote from questions WHERE  id = CAST(${id} as varchar(50))`);
    result = await sqlPool(`UPDATE questions SET vote = CAST(${Number(vote.recordset[0].vote) + 1} as varchar(50)) WHERE  id = CAST(${id} as varchar(50))`);
    res.status(200).send(result);
  } catch (error) {
    result = error;
    res.status(400).send(result);
  }
});

module.exports = router;
