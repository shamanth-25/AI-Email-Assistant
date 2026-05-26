const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/generate-email", async (req, res) => {

    const { purpose, tone, details } = req.body;

    const prompt = `
Write a ${tone} email.

Purpose:
${purpose}

Details:
${details}
`;

    try {

        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama-3.1-8b-instant",

                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            },

            {
                headers: {
                    Authorization:
                        `Bearer ${process.env.GROQ_API_KEY}`,

                    "Content-Type":
                        "application/json"
                }
            }
        );

        const email =
            response.data.choices[0].message.content;

        res.json({ email });

    } catch (error) {

        console.log(
            error.response?.data || error.message
        );

        res.status(500).json({
            error: "Something went wrong"
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});