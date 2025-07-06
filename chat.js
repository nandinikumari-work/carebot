
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send("Only POST requests allowed");
  }

  const { message } = req.body;

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a kind and cautious medical assistant. You help users understand symptoms and suggest OTC remedies or when to see a doctor. Never give prescriptions.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    }),
  });

  const data = await openaiRes.json();
  return res.status(200).json({ reply: data.choices[0].message.content });
}
