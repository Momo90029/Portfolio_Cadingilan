import express from "express";
import OpenAI from "openai";

const router = express.Router();

router.post("/polish", async (req, res) => {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { message } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Rewrite this professionally as a job availability message: ${message}`,
        },
      ],
    });

    res.json({ polished: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error contacting AI");
  }
});

export default router;
