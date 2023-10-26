const express = require('express');
const app = express();
const port = 8080;
const connection = require('./models').connection;
const sequelize = require('./config/db');
const path = require('path');

const multer = require('multer');
const upload = multer({ 
    fileFilter: (req, file, cb) => {
        if(file.mimetype === 'image/png') {
            cb(null, true);
        }
        else {
            cb(new multer.MulterError('not a PNG'));
        }
    },
    limits: {
        fieldSize: 1024 * 1024 * 10,
        fieldNameSize: 200,
    },
    dest: './uploads'
 }).single('upload');

const router = require('./routes');
app.use(express.json())
app.use('/static',express.static(path.join(__dirname, '..\\front-end\\public\\css')));
app.use('/static',express.static(path.join(__dirname, '..\\front-end\\public\\js')));
app.use('/assets', express.static(path.join(__dirname, '..\\front-end\\assets'))); 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "..\\front-end\\public\\html\\landingPage.html"));
});
app.get('/login',(req,res) => {
    res.sendFile(path.join(__dirname, "..\\front-end\\public\\html\\loginPage.html"))
})

app.get('/registerOrg', (req,res) => {
    res.sendFile(path.join(__dirname, "..\\front-end\\public\\html\\registerOrg.html"));
})

app.get('/registerUser', (req,res) => {
    res.sendFile(path.join(__dirname, "..\\front-end\\public\\html\\registerUser.html"));
})

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, "..\\front-end\\public\\html\\index.html"));
})
app.get('/organizatii', (req, res) => {
    res.sendFile(path.join(__dirname, "..\\front-end\\public\\html\\organizatii.html"));
})
app.get('/donatii', (req, res) => {
    res.sendFile(path.join(__dirname, "..\\front-end\\public\\html\\donationPage.html"));
})

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, "..\\front-end\\public\\html\\profile.html"));
})

app.use('/api', router);


app.get('/reset', (req, res) => {
    connection
    .sync({
        force: true,
    }).then(() => {
        res.status(201).send({message: "Database reset!"});
    }).catch((err) => {
        res.status(500).send({message: "Database reset failed", err: err.message});
    })
});

// app.post('/upload', (req, res) => {
//     upload(req, res, (err) => {
//         if(err instanceof multer.MulterError) {
//             res.send('file not uploaded since it\'s not a PNG');
//         }
//         else 
//         {
//             res.send('file uploaded');
//         }
//     });
// });


app.listen(port, () => {
    console.log(`Server is online on port ${port}`);
    console.log(`http://localhost:${port}`);
});