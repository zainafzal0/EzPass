const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const {encrypt,decrypt} = require("./EncryptionHandler");
const saltRounds = 10;
var request = require('request');
const PORT = 3001;




app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "zainafzal",
  database: "ezpass",
});


app.post("/register", (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
  
    db.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
        if (result.length > 0) {
          console.log("Username Already Exists!");
          res.send({ message: "Username Already Exists!" });
        } else {
          console.log("Username is good!");
          bcrypt.hash(password,saltRounds,(err, hash) => {
            if(err){
                console.log(err);
            }
            db.query(
                "INSERT INTO users (person_name, username, pass) VALUES (?,?,?)",
                [name, username, hash],
                (err, result) => {
                  if (err) {
                    res.send({ err: err });
                  }
                  res.send(result);
                }
              );
          })

        }
      }
    );
});

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if(!token){
        res.send("Token is Needed");
    }else{
        JWT.verify(token, "jwtSecret", (err, decoded) => {
            if(err){
                res.json({authurized:false,message: "Failed to Authenticate"});
            }else{
                req.userId = decoded.id;
                next();
            }
        })
    }
}

app.get('/authUser',verifyJWT, (req,res) => {
    res.send("Authenticated User");
})

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].pass, (error,response) => {
           if(response){
               const id = result[0].id;
               const token = JWT.sign({id},"zainafzal52", {
                   expiresIn: 300,
                })


               res.json({authurized: true, token: token, result});
           } 
           else{
            res.send({ message: "Incorrect Username/Password!" });
           }
        })
      } else {
        res.send({ message: "User doesn't exist!" });
      }
    }
  );
});


app.post("/api/addPassword", (req,res) => {
  const siteName = req.body.siteName;
  const siteURL = req.body.siteURL;
  const email = req.body.email;
  const password = req.body.password;
  const default_img = req.body.default_img;
  const user_id = req.body.user_id;
  const encryptedPass = encrypt(password);


  db.query(
    "INSERT INTO account_passwords (site_name, site_url, email, pass, iv, default_img, user_id) VALUES (?,?,?,?,?,?,?)",
    [siteName,siteURL,email, encryptedPass.password,encryptedPass.iv, default_img, user_id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );

})


app.get('/api/getPasswords', (req,res) => {
  const user_id = req.query.user_id;
  db.query(
    "SELECT * FROM account_passwords WHERE user_id = ?;",
    user_id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      for(let i=0;i<result.length;i++){
        result[i].pass = decrypt(result[i].pass, result[i].iv);
      }
      res.send(result);
    }
  );
})

app.post('/api/deletePassword', (req,res) => {
  const id = req.body.id;


  db.query(
    "DELETE FROM account_passwords WHERE id = ?;",
    id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
});

app.post('/api/updatePassword', (req,res) => {
  const site_url = req.body.site_url;
  const email = req.body.email;
  const pass = req.body.password;
  const id = req.body.id;

  const encryptedPass = encrypt(pass);

  db.query(
    "UPDATE account_passwords SET site_url = ?,email = ?, pass = ?, iv = ? WHERE id = ?;",
    [site_url,email,encryptedPass.password,encryptedPass.iv,id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
})




//Endpoints for Card Page
app.post("/api/addCard", (req,res) => {
  const card_vendor = req.body.card_vendor;
  const card_type = req.body.card_type;
  const name = req.body.name;
  const card_number = req.body.card_number;
  const securityCode = req.body.securityCode;
  const expiryDate = req.body.expiryDate;
  const default_img = req.body.default_img;
  const user_id = req.body.user_id;


  // console.log(card_vendor,card_type,name,card_number,securityCode,expiryDate,default_img,user_id)
  // const encryptedPass = encrypt(password);


  db.query(
    "INSERT INTO account_cards (card_vendor,card_type,name_on_card, card_number, security_code, expiry_date, default_img, user_id) VALUES (?,?,?,?,?,?,?,?)",
    [card_vendor,card_type,name,card_number, securityCode,expiryDate,default_img, user_id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );

})


app.get('/api/getCards', (req,res) => {
  const user_id = req.query.user_id;


  db.query(
    "SELECT * FROM account_cards WHERE user_id = ?;",
    user_id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      // for(let i=0;i<result.length;i++){
      //   result[i].pass = decrypt(result[i].pass, result[i].iv);
      // }
      res.send(result);
    }
  );
})

app.post('/api/deleteCard', (req,res) => {
  const id = req.body.id;


  db.query(
    "DELETE FROM account_cards WHERE id = ?;",
    id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
});

app.post('/api/updateCard', (req,res) => {
  const card_vendor = req.body.card_vendor;
  const name = req.body.name;
  const card_number = req.body.card_number;
  const securityCode = req.body.securityCode;
  const expiryDate = req.body.expiryDate;
  const id = req.body.id;
  db.query(
    "UPDATE account_cards SET card_vendor = ?, name_on_card = ?, card_number = ?, security_code = ?, expiry_date = ? WHERE id = ?;",
    [card_vendor,name,card_number,securityCode,expiryDate,id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
})




//Endpoints for Notes Page
app.post("/api/addNote", (req,res) => {
  const title = req.body.noteTitle;
  const note = req.body.note;
  const user_id = req.body.user_id;
  // const encryptedPass = encrypt(password);


  db.query(
    "INSERT INTO account_notes (title, note, user_id) VALUES (?,?,?)",
    [title,note,user_id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );

})


app.get('/api/getNotes', (req,res) => {
  const user_id = req.query.user_id;


  db.query(
    "SELECT * FROM account_notes WHERE user_id = ?;",
    user_id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      // for(let i=0;i<result.length;i++){
      //   result[i].pass = decrypt(result[i].pass, result[i].iv);
      // }
      res.send(result);
    }
  );
})

app.post('/api/deleteNote', (req,res) => {
  const id = req.body.id;


  db.query(
    "DELETE FROM account_notes WHERE id = ?;",
    id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
});

app.post('/api/updateNote', (req,res) => {
  const title = req.body.title;
  const note = req.body.note;
  const id = req.body.id;
  db.query(
    "UPDATE account_notes SET title = ?, note = ? WHERE id = ?;",
    [title,note,id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
})






//Endpoints for Addresses Page
app.post("/api/addAddress", (req,res) => {
  const title = req.body.title;
  const name = req.body.name;
  const address = req.body.address;
  const number = req.body.phoneNumber;
  const user_id = req.body.user_id;
  // const encryptedPass = encrypt(password);


  db.query(
    "INSERT INTO account_addresses (title, person_name, address, phone_number, user_id) VALUES (?,?,?,?,?)",
    [title,name, address,number, user_id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );

})


app.get('/api/getAddresses', (req,res) => {
  const user_id = req.query.user_id;

  console.log(user_id);
  db.query(
    "SELECT * FROM account_addresses WHERE user_id = ?;",
    user_id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      // for(let i=0;i<result.length;i++){
      //   result[i].pass = decrypt(result[i].pass, result[i].iv);
      // }
      res.send(result);
    }
  );
})

app.post('/api/deleteAddress', (req,res) => {
  const id = req.body.id;


  db.query(
    "DELETE FROM account_addresses WHERE id = ?;",
    id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
});

app.post('/api/updateAddress', (req,res) => {
  const title = req.body.title;
  const name = req.body.name;
  const address = req.body.address;
  const number = req.body.phoneNumber;
  const id = req.body.id;
  db.query(
    "UPDATE account_addresses SET title = ?, person_name = ?, address = ?, phone_number = ? WHERE id = ?;",
    [title,name,address,number,id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
})










app.listen(PORT, () => {
  console.log("server is running");
});
