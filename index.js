require('dotenv').config()
const express = require('express');

let app = express();

app.set('view engine', 'ejs');


//routes



app.get('/', (req, res) => {   //get只允許get方式來拜訪,
  // res.send(`<h2>泥好</h2>`)

  res.render('main', { name: 'Kunda' });

})

app.get('/sales-json',(req,res)=>{
  const sales = require(__dirname + '/data/sales')
  console.log(sales)
  res.render('sales-json',{sales})

})

app.get('/json-test', (req, res) => {   //res.end(),res.send,res.render,res.json只能擇一

  res.json({ name: '小新', age: 30 })

})

app.get('/try-qs',(req,res)=>{

  res.json(req.query);

})

const urlencodeParser = express.urlencoded({extended:false});
app.post('/try-post',urlencodeParser,(req,res)=>{

  res.json(req.body);

})


app.use(express.static('public'));//使用靜態內容的資料夾,已經設定成根目錄

app.use(express.static('node_modules/bootstrap/dist'))

app.use((req, res) => {   //use允許所有的方法拜訪
  // res.type('text/plain');  //預設type為html
  res.status(404).render('404.ejs');
})


const port = process.env.SERVER_PORT || 3002  //如果沒有require('dotenv').config()設定就會啟動 3002
app.listen(port, () => {
  console.log(`server start,port:${port}`)
})