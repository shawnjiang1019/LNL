import { Request, Response } from "express";
import express from "express";
import cors from 'cors'
import { config } from "dotenv"
import OpenAI from "openai";
config()

const app = express();
const port = 5500;

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_SECRET_KEY
});

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

interface Songs {
  songs: string[];
}

interface Image {
  payload: string | undefined
}

interface Prediction {
  emotions: Emotions;
}

interface Prompt {
  prompt: string | undefined
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

app.post('/getEmotions', async (req: Request, res: Response) => {
  const payload = req.body as Image
  if (payload.payload === undefined) {
    res.send("Error, something wrong happened")
    return "There was an error with sending data as body"
  }
  console.log('hi')
  try {
    console.log('hi2')
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
    console.log("here")
    const songsResponse = await fetch("http://127.0.0.1:5000/get_songs")
    const songs: Songs = await songsResponse.json()
    console.log
    const size = songs.songs.length
    const message = `You will play the role of a human Rogerian therapist who is emulating the popular AI program Eliza, and must treat me as a mental health patient. Your only job is to determine, based on the patient's story, at least 50 songs that would be best fit the person's situation based on their top ${size} songs listed. Don't ask any questions, just take whatever story they had as the only source of information to determine the answer.
    Here is the following emotions data from image:
    ${JSON.stringify(prediction)}
    
    Here are the top ${size} songs:
    [${songs.songs}]
    
    Respond only in this json format:
    {
      "songs": [${songs.songs.map((song, i) => `song ${i + 1}`)}]
    }
    
    Make sure to have at least 50 songs in response!
    
    DON'T say "by <author name>".`
    const bestSongs = await getBestSongs(message)
    if (bestSongs === null) {
      res.send("Best songs cannot be parsed/generated properly.")
      return
    }
    res.json(bestSongs);
  } catch(e) {
    console.log('hi3')
    res.send(e)
  }
  
  
});

async function getBestSongs(prompt: string): Promise<Songs | null> {
  try {
      const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{"role": "user", "content": prompt}],
          temperature: 0.6
      }); 

      return JSON.parse(response.choices[0].message.content!) as Songs
  } catch(e) {
    console.error(e)
    return null
  }
}

app.post("/getSongsFromText", async (req: Request, res: Response) => {
  const prompt = req.body as Prompt
  if (prompt.prompt === undefined) {
    res.send("Error, something wrong happened")
    return "There was an error with sending data as body"
  }
  try {
    console.log("here")
    const response = await fetch("http://127.0.0.1:5000/get_songs")
    const songs: Songs = await response.json()
    console.log(songs)
    const size = songs.songs.length
    const message = `You will play the role of a human Rogerian therapist who is emulating the popular AI program Eliza, and must treat me as a mental health patient. Your only job is to determine, based on the patient's story, at least 50 songs that would be best fit the person's situation based on their top ${size} songs listed. Don't ask any questions, just take whatever story they had as the only source of information to determine the answer.
    Here is the following story:
    "${prompt.prompt}"
    
    Here are the top ${size} songs:
    [${songs.songs}]
        
    Respond only in this json format:
    {
      "songs": [${songs.songs.map((song, i) => `song ${i + 1}`)}]
    }

    Make sure to have at least 50 songs in response!
            
    DON'T say "by <author name>".`
    const bestSongs = await getBestSongs(message)
    if (bestSongs === null) {
      res.send("Best songs cannot be parsed/generated properly.")
      return
    }
    console.log(message)
    res.json(bestSongs);
  } catch(e) {
    res.send(e)
  }
}) 

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});