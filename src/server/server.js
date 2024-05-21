const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const path = require("path");
const multer = require('multer');
const app = express();
app.use(cors());
app.use(bodyParser.json());


/* DB Access */
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'copla'
});

/* Conection */
db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos');
});


/* Calls */
app.get('/users', (req, res) => {
  let sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  let sql = `SELECT * FROM users WHERE user_id=${id}`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get('/communities', (req, res) => {
  let sql = 'SELECT * FROM communities';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get('/communities/:id', (req, res) => {
  const { id } = req.params;
  let sql = `SELECT * FROM communities WHERE community_id=${id}`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get('/documents_history', (req, res) => {
  let sql = 'SELECT * FROM documents_history';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get('/documents_history/:id', (req, res) => {
  const { id } = req.params;
  let sql = `SELECT * FROM documents_history WHERE document_community_id=${id}`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get('/bookings', (req, res) => {
  let sql = 'SELECT * FROM bookings';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get('/bookings/:id', (req, res) => {
  const { id } = req.params;
  let sql = `SELECT * FROM bookings WHERE booking_date >= CURDATE() AND booking_user_id=${id} ORDER BY booking_date ASC;`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/bookings/insert", (req, res) => {
  const booking = {
    booking_id: req.body.booking_id,
    booking_user_id: req.body.booking_user_id,
    booking_timestamp: req.body.booking_timestamp,
    booking_date: req.body.booking_date,
    booking_installation: req.body.booking_installation,
    booking_time: req.body.booking_time,
    booking_community_id: req.body.booking_community_id,
  }
  const sql = `INSERT INTO bookings SET ?`
  db.query(sql, booking, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/users/insert", (req, res) => {
  const newUser = {
    user_id: req.body.user_id,
    nick: req.body.nick,
    password: req.body.password,
    rol: req.body.rol || 'Usuario',
    create_date: req.body.create_date,
    name: req.body.name,
    surnames: req.body.surnames,
    community_id: req.body.community_id,
    building: req.body.building,
    floor: req.body.floor,
    door: req.body.door,
    contact_phone: req.body.contact_phone,
    contact_email: req.body.contact_email,
  }
  const sql = `INSERT INTO users SET ?`
  db.query(sql, newUser, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get('/notices', (req, res) => {
  let sql = 'SELECT * FROM notices';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get('/notices/:id', (req, res) => {
  const { id } = req.params;
  let sql = `SELECT * FROM notices WHERE notice_elimination_date >= CURRENT_DATE AND notice_community_id=${id} ORDER BY notice_elimination_date ASC;`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.delete('/bookings/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM bookings WHERE booking_id=${id}`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

/* Upload images */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../server/uploadImages');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
app.post('/uploadImages', upload.single('image'), (req, res) => {

  if (!req.file) {
    return res.status(400).send({error:'No se subió ningún archivo'});
  }
  res.status(200).send({message:'Archivo subido con éxito'});
});


app.get('/', (req, res) => {
  res.send("Conectado");
})

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});
