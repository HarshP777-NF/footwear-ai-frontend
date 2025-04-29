const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

const USERS = {
  salesman1: 'password123', // add more if needed
};

app.use(express.static('public'));

app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/chat.html');
  } else {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (USERS[username] === password) {
    req.session.user = username;
    res.redirect('/chat.html');
  } else {
    res.send('Invalid credentials');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

app.listen(3000, () => console.log('Frontend running on port 3000'));
