// prisma client
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient()

// EMAIL SEND
var SibApiV3Sdk = require("sib-api-v3-sdk");
var defaultClient = SibApiV3Sdk.ApiClient.instance;
// Configure API key authorization: api-key
var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey =
    "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";

const sendVerif = (email, id) => {
    var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
    sendSmtpEmail = {
        sender: {
            name: "UsedUp",
            email: "support@usedup.com"
        },
        to: [
            {
                email: email,
                name: "User",
            },
        ],
        subject: "Please confirm your email",
        htmlContent: `
        <html>
        <head>
        <style>
        body {
            color: white;
  font-family: 'Arial';
  background-color: #F6F6F6
}

.container {
  margin: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper {
  max-width: 400px;
  padding: 30px;
  background-color: white;
}

img {
  border-radius: 100px;
}

.verif {
  display: inline-block;
  width: auto;
  margin: .4em 0;
  text-decoration: none;
  padding: 12px 18px;
  background-color: black;
  border-radius: 6px;
  color: white;
}

.regard {
  font-size: 14px;
  letter-spacing: 1px;
}


.message {
  letter-spacing: 1px;
}
</style>  </head>
        <body>
        <div class="container">
        <div class='wrapper'>
          <img src="https://i.postimg.cc/XNZKKwPR/logo.png" alt="logo" width=60>
          <p class='message'>Hello! <br><br> Terima kasih sudah menggunakan   platform kami, klik button di bawah untuk mem-verifikasi akun kamu.
          </p>
          <a class="verif" href="https://usedup.vercel.app/verification/${id}">Verifikasi</a>
          <p class='regard'>Salam, <br> UsedUp Team</p>
        </div>
      </div></body></html>`,
    };
    apiInstance.sendTransacEmail(sendSmtpEmail).then(
        function (data) {
            console.log("API called successfully. Returned data: " + data);
        },
        function (error) {
            console.error(error);
        }
    );
}

// Setup JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

const userRegister = async (req, res) => {
    // get parameter
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400).json({ messages: 'Please add all fields' })
    }

    // check jika user sudah ada
    const checkUser = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })

    // if user existed
    if (checkUser) {
        res.status(400)
        res.json({ message: 'User already exist' })
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user 
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    if (user) {
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            tentang_saya: user.tentang_saya,
            no_telp: user.no_telp,
            foto_profile: user.foto_profile,
            token: generateToken(user.id)
        })
        sendVerif(user.email, user.id)
    } else {
        res.status(400)
        res.json({ message: 'invalid user data' })
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body


    if (!email || !password) {
        res.status(400)
        res.json({ message: 'Form tidak boleh kosong' })
    }

    // check if existed
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })


    if (user) {
        // compare password
        bcrypt.compare(password, user.password, function (err, result) {
            if (result === true) {
                res.json({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    tentang_saya: user.tentang_saya,
                    no_telp: user.no_telp,
                    foto_profile: user.foto_profile,
                    token: generateToken(user._id)
                })
            } else {
                res.status(400)
                res.json({ message: 'invalid credentials' })
            }
        });
    } else {
        res.status(400)
        res.json({ message: 'User tidak ditemukan' })
    }
}

const updateUser = async (req, res) => {
    const { name, email, tentang_saya, foto_profile, no_telp } = req.body

    try {
        const response = await prisma.user.update({
            where: {
                id: req.body.id
            },
            data: {
                name,
                email,
                tentang_saya,
                foto_profile,
                no_telp
            }
        })

        res.status(200).json({
            status: 'success',
            data: {
                id: response.id,
                name: response.name,
                email: response.email,
                no_telp: response.no_telp,
                foto_profile: response.foto_profile,
                token: generateToken(response.id)
            }
        })
    } catch (error) {
        res.json(error)
    }
}

const verification = async (req, res) => {
    try {
        await prisma.user.update({
            where: {
                id: req.query.id
            },
            data: {
                isVerified: true
            }
        })

        res.status(200).json({
            status: true,
            message: 'Your account has been verified!',
        })
    } catch (error) {
        res.json(error)
    }
}

module.exports = { userRegister, userLogin, updateUser, verification }