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
interface SongTracks {
  songs: Array<[string, string]>
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

interface User {
  display_name: string;
  external_urls: Externalurls;
  href: string;
  id: string;
  images: Image[];
  type: string;
  uri: string;
  followers: Followers;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

interface Externalurls {
  spotify: string;
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

interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: Externalurls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}

interface Tracks {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Item[];
}

interface Item {
  added_at: string;
  added_by: Addedby;
  is_local: boolean;
  track: Track;
}

interface Track {
  album: Album;
  artists: Artist2[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: Externalids;
  external_urls: Externalurls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: Linkedfrom;
  restrictions: Restrictions;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

interface Linkedfrom {
}

interface Externalids {
  isrc: string;
  ean: string;
  upc: string;
}

interface Artist2 {
  external_urls: Externalurls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: Externalurls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: Restrictions;
  type: string;
  uri: string;
  artists: Artist[];
}

interface Artist {
  external_urls: Externalurls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface Restrictions {
  reason: string;
}

interface Addedby {
  external_urls: Externalurls;
  followers: Followers;
  href: string;
  id: string;
  type: string;
  uri: string;
}

interface Owner {
  external_urls: Externalurls;
  followers: Followers;
  href: string;
  id: string;
  type: string;
  uri: string;
  display_name: string;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

interface Followers {
  href: string;
  total: number;
}

interface Externalurls {
  spotify: string;
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
    const songs: SongTracks = await songsResponse.json()
    const size = songs.songs.length
    const message = `You will play the role of a human Rogerian therapist who is emulating the popular AI program Eliza, and must treat me as a mental health patient. Your only job is to determine, based on the patient's story, at least 50 songs that would be best fit the person's situation based on their top ${size} songs listed. Don't ask any questions, just take whatever story they had as the only source of information to determine the answer.
    Here is the following emotions data from image:
    ${JSON.stringify(prediction)}
    
    Here are the top ${size} songs:
    ${JSON.stringify(songs.songs)}
        
    Respond only in this json format:
    {
      "songs": [${songs.songs.map((song, i) => JSON.stringify([`song ${i + 1}`, `spotifyid ${i + 1}`]))}]
    }

    Make sure to have at least 30 songs in response!
            
    DON'T say "by <author name>".`
    console.log(message)
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
      const temp = JSON.parse(response.choices[0].message.content!) as Songs
      console.log(temp)
      return temp
  } catch(e) {
    console.error(e)
    return null
  }
}


app.get("/createPlaylist", async (req: Request, res: Response) => {
  try {
    const responseSongs = await fetch("http://127.0.0.1:5000/get_songs")
    const songs: SongTracks = await responseSongs.json()
    console.log(songs)
    const responseToken = await fetch("http://127.0.0.1:5000/get_token")
    const accessToken = await responseToken.text()
    console.log(accessToken)
    const responseUser = await fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    const user: User = await responseUser.json()
    const userId = user.id
    const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        name: "LNL"
      }),
      
    }) 
    const playlist: Playlist = await playlistResponse.json()
    console.log(playlist)

    const playlistId = playlist.id
    let uris: Array<string> = songs.songs.map((e, i) => "spotify:track:" + e[1])
    const finalResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          uris: uris,
          position: 0
      })
      }
    )
    console.log(await finalResponse.json())
      res.json({ message: "Wohoooo!!, it workeed!!!!" })
    } catch(e) {
      res.send(e)
    }

  })

app.post("/getSongsFromText", async (req: Request, res: Response) => {
  const prompt = req.body as Prompt
  if (prompt.prompt === undefined) {
    res.send("Error, something wrong happened")
    return "There was an error with sending data as body"
  }
  try {
    console.log("here")
    const response = await fetch("http://127.0.0.1:5000/get_songs")
    const songs: SongTracks = await response.json()
    console.log(songs)
    const size = songs.songs.length
    const message = `You will play the role of a human Rogerian therapist who is emulating the popular AI program Eliza, and must treat me as a mental health patient. Your only job is to determine, based on the patient's story, at least 50 songs that would be best fit the person's situation based on their top ${size} songs listed. Don't ask any questions, just take whatever story they had as the only source of information to determine the answer.
    Here is the following story:
    "${prompt.prompt}"
    
    Here are the top ${size} songs with their ids:
    ${JSON.stringify(songs.songs)}
        
    Respond only in this json format:
    {
      "songs": [${songs.songs.map((song, i) => JSON.stringify([`song ${i + 1}`, `spotify id ${i + 1}`]))}]
    }

    Make sure to have at least 30 songs in response!
            
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