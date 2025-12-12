export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const hfRes = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: req.body.prompt }),
      }
    );

    const raw = await hfRes.json();

    // ⭐ Normalize response shape
    let reply = "No response";

    if (Array.isArray(raw) && raw[0]?.generated_text) {
      reply = raw[0].generated_text;
    } else if (raw.generated_text) {
      reply = raw.generated_text;
    } else if (raw[0]?.text) {
      reply = raw[0].text;
    }

    res.status(200).json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed" });
  }
}
