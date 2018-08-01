const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

const DATA_FILE = path.join(__dirname, 'data.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.get('/api/timers', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/api/timers', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const contacts = JSON.parse(data);
    const newContact = {
      name: req.body.name,
      address: req.body.address,
      mail: req.body.mail,
      date: req.body.date,
      cellphone: req.body.cellphone,
      image: req.body.image,
      id: req.body.id,
    };
    contacts.push(newContact);
    fs.writeFile(DATA_FILE, JSON.stringify(contacts, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(contacts);
    });
  });
});

app.post('/api/timers/start', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const contacts = JSON.parse(data);
    contacts.forEach((contact) => {
      if (contact.id === req.body.id) {
        contact.runningSince = req.body.start;
      }
    });
    fs.writeFile(DATA_FILE, JSON.stringify(contacts, null, 4), () => {
      res.json({});
    });
  });
});

app.post('/api/timers/stop', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const contacts = JSON.parse(data);
    contacts.forEach((contact) => {
      if (contact.id === req.body.id) {
        const delta = req.body.stop - contact.runningSince;
        contact.elapsed += delta;
        contact.runningSince = null;
      }
    });
    fs.writeFile(DATA_FILE, JSON.stringify(contacts, null, 4), () => {
      res.json({});
    });
  });
});

app.put('/api/timers', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const timers = JSON.parse(data);
    timers.forEach((contact) => {
      if (contact.id === req.body.id) {
        contact.name = req.body.name;
        contact.address = req.body.address;
        contact.mail = req.body.mail;
        contact.date = req.body.date;
        contact.cellphone = req.body.cellphone;
        contact.image = req.body.image;


      }
    });
    fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
      res.json({});
    });
  });
});

app.delete('/api/timers', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    let contacts = JSON.parse(data);
    contacts = contacts.reduce((memo, contact) => {
      if (contact.id === req.body.id) {
        return memo;
      } else {
        return memo.concat(contact);
      }
    }, []);
    fs.writeFile(DATA_FILE, JSON.stringify(contacts, null, 4), () => {
      res.json({});
    });
  });
});

app.get('/molasses', (_, res) => {
  setTimeout(() => {
    res.end();
  }, 5000);
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
