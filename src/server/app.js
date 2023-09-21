// import express from 'express';

const express = require('express')
const path = require('path')
const app = express()
const port = 3003

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})