require('dotenv').config()
const express = require('express');
const { Cookie } = require('express-session');
// const multer = require('multer');
// const upload = multer({ dest: 'tmp_uploads' });
const upload = require(__dirname + '/modules/upload-img');
const fs = require('fs').promises;
const session = require('express-session');
const MysqlStore = require('express-mysql-session')(session);
const moment = require('moment-timezone');
const db = require(__dirname + '/modules/db_connect2');
const sessionStore = new MysqlStore({}, db);

let app = express();

app.set('view engine', 'ejs');


// top-level middleware
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: 'qazxcvbnm',
  store: sessionStore,
  cookie: {
    maxAge: 10000
  }
}))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//routes
app.get('/', (req, res) => {   //get只允許get方式來拜訪,
  // res.send(`<h2>泥好</h2>`)
  res.render('main', { name: 'Kunda' });
});

app.get('/sales-json', (req, res) => {
  const sales = require(__dirname + '/data/sales')
  console.log(sales)
  res.render('sales-json', { sales })
});

app.get('/json-test', (req, res) => {   //res.end(),res.send,res.render,res.json只能擇一
  res.json({ name: '小新', age: 30 })
});

app.get('/try-qs', (req, res) => {
  res.json(req.query);
});


app.post('/try-post', (req, res) => {
  res.json(req.body);
});

app.get('/try-post-form', (req, res) => {
  res.render('try-post-form');
});
app.post('/try-post-form', (req, res) => {
  res.render('try-post-form', req.body);
});


app.post('/try-upload', upload.single('avatar'), async (req, res) => {
  res.json(req.file);

  /* 
  if (req.file && req.file.originalname) {
    await fs.rename(req.file.path, `public/imgs/${req.file.originalname}`);  //rename(舊路徑,新路徑)
    res.json(req.file);
  }else{
    res.json({msg:'檔案沒有上傳'});
  }
  */

})

app.post('/try-upload2', upload.array('photos'), async (req, res) => {
  res.json(req.files);

})

app.get('/my-params1/:action/:id', (req, res) => {
  res.json(req.params);
});

app.get(/^\/m\/09\d{2}-?\d{3}-?\d{3}$/i, (req, res) => {
  let u = req.url.slice(3);
  u = u.split('?')[0];
  u = u.split('-').join('');
  res.json({ mobile: u });

})

app.use('/admin2', require(__dirname + '/routes/admin2'));

const myMiddle = (req, res, next) => {
  res.locals = { ...res.locals, kunda: '哈囉' };
  res.locals.derrr = 123;
  next()

};

app.get('/try-middle', [myMiddle], (req, res) => {  //多個middleware加陣列
  res.json(res.locals)
});


app.get('/try-session', (req, res) => {
  req.session.aaa ||= 0;  //預設值
  req.session.aaa++;
  res.json(req.session);
});

app.get('/try-moment', (req, res) => {
  const m = moment();

  res.send({
    m: m.format('YYYY-MM-DD HH:mm:ss')
  })

})

app.get('/try-db', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM address_book LIMIT 5')
  res.json(rows)
})


//_________________________________________________________

app.use(express.static('public'));//使用靜態內容的資料夾,已經設定成根目錄

app.use(express.static('node_modules/bootstrap/dist'));


//_____________________________________________________________
app.use((req, res) => {   //use允許所有的方法拜訪
  // res.type('text/plain');  //預設type為html
  res.status(404).render('404.ejs');
})


const port = process.env.SERVER_PORT || 3002;  //如果沒有require('dotenv').config()設定就會啟動 3002
app.listen(port, () => {
  console.log(`server start,port:${port}`);
});