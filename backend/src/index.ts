import { Request, Response } from "express";
import express from "express";
import cors from 'cors'
import { config } from "dotenv"
config()

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PATCH", "DELETE"]
}));
app.options('*', cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PATCH", "DELETE"]
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


interface Image {
  payload: string | undefined
}

interface Prediction {
  emotions: Emotions;
}

interface Emotions {
  angry: number;
  disgust: number;
  fear: number;
  happy: number;
  sad: number;
  surprise: number;
  neutral: number;
}

app.post('/getEmotion', async (req: Request, res: Response) => {
  const payload = req.body as Image
  if (payload.payload === undefined) {
    res.send("Error, something wrong happened")
    return "There was an error with sending data as body"
  }
  try {
    const response = await fetch("http://127.0.0.1:5000/input", 
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const prediction: Prediction = await response.json()
    res.json(prediction);
  } catch(e) {
    res.send(e)
  }
  
  
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});