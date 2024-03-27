const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const PORT = 5800;

const app = express();
const upload = multer();
const transporter = nodemailer.createTransport({
 host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "jaykalariya.humbee@gmail.com",
    pass: "wecdoqzwxfcifkss",
  },
});

app.post("/sendEmail", upload.single("file"), async (req, res) => {
  const { name, email } = req.body;
  const file = req.file;
  const mailOptions = {
    from: "jaykalariya.humbee@gmail.com",
    to: "jaykalariya.humbee@gmail.com",
    subject: "New form submission",
    html: `<p>Name: ${name}</p><p>Email: ${email}</p>`,
    attachments: file
      ? [{ filename: file.originalname, content: file.buffer }]
      : [],
  };
  
await transporter.sendMail(mailOptions);
});

//   try {
    // res.send("Email sent successfully!");
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).send("Error sending email.");
//   }
// });

app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});
