const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const RECAPTCHA_SECRET_KEY = "6LffFeYqAAAAAEl5jPJRBcZ_u5xLcEk3xcmkZ5da"; // 🔹 Replace with your secret key

app.post("/verify-recaptcha", async (req, res) => {
  const { token } = req.body; // Get token from frontend

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET_KEY,
          response: token,
        },
      }
    );

    if (response.data.success) {
      res.json({ success: true, message: "reCAPTCHA verified" });
    } else {
      res.json({ success: false, message: "reCAPTCHA verification failed", error: response.data["error-codes"] });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
