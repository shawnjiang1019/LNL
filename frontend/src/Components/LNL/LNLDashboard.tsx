import React, { useState, useEffect } from "react";

import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

import { toast } from "react-toastify";
import axios from "axios";
import { CircularProgress } from "@mui/material";

interface LNLDashboardProps { }
export default function LNLDashboard({ }: LNLDashboardProps) {
  const [prompt, setPrompt] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    setPrompt(localStorage.getItem("prompt") as string);
    setImgSrc(localStorage.getItem("imgSrc") as string);
  }, []);

  const handleReset = () => {
    localStorage.removeItem("prompt");
    localStorage.removeItem("description");
    localStorage.removeItem("imgSrc");
  };


  const [spotifyId, setSpotifyId] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleScan = async () => {
    if (!imgSrc) {
      alert("Please add a photo");
      return;
    }
    if (!prompt) {
      alert("Please add a prompt");
      return;
    }
    setLoading(true)

    // console.log(localStorage.getItem('imgSrc'))
    let emotionSongs = []
    const res = await fetch("http://localhost:5500/getEmotions", {
      body: JSON.stringify({
        payload: localStorage.getItem("imgSrc"),
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    },)
    emotionSongs = await res.json()
    console.log('getemotions data', emotionSongs)

    // console.log('asd', localStorage.getItem("imgSrc"))
    toast.info("Scanning...");

    let textSongs = []
    try {
      const imageRes = await fetch("http://localhost:5500/getSongsFromText", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:
          JSON.stringify({
            prompt: localStorage.getItem("prompt")
          })
      });
      textSongs = await imageRes.json()
      console.log('text songs', textSongs);
    } catch (e) {
      console.log(e)
    }

    const uniqueSongs = Array.from(new Set<string>([
      ...emotionSongs.songs.map((song: any[]) => song[1]),
      ...textSongs.songs.map((song: any[]) => song[1])
    ]))
    const topSongs = [
      ...emotionSongs.songs,
      ...textSongs.songs
    ].filter(song => uniqueSongs.includes(song[1]))
    console.log('top songs', topSongs)

    try {
      const playlistRes = await fetch("http://localhost:5500/createPlaylist", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ songs: topSongs }),
      });
      const playlist = await playlistRes.json()
      console.log(playlist);
      setSpotifyId(playlist.id)
    } catch (e) {
      console.log(e)
    }

    setLoading(false)
    toast.success("Done...");
  };

  return (
    <div className="dashboard-page">
      <header className="lnl-header">
        <div>Utiliy menu coming...</div>
        <div>
          <Button
            className=""
            variant="contained"
            color={imgSrc ? "success" : "inherit"}
            style={{ color: imgSrc ? "white" : "black", width: "6rem" }}
            href="/face"
          >
            Face
          </Button>
          <Button
            className=""
            variant="contained"
            color={prompt ? "success" : "inherit"}
            style={{ color: prompt ? "white" : "black", width: "6rem" }}
            href="/prompt"
          >
            Prompt
          </Button>
        </div>
        <div style={{ float: "right" }}>
          <Button
            variant="contained"
            color="error"
            style={{ color: "white", padding: "0.5rem 4rem", width: "6rem" }}
            onClick={handleReset}
          >
            Reset
          </Button>

          <Button
            className=""
            variant="contained"
            style={{
              backgroundColor: imgSrc && prompt ? "green" : "white",
              color: imgSrc && prompt ? "white" : "black",
              padding: "0.5rem 4rem",
              width: "6rem",
            }}
            onClick={handleScan}
          >
            Scan
          </Button>
        </div>
      </header>

      <div className="dashboard-container">
        <div className="lnl-dashboard-container">
          <div className="dashboard-sidebar">
            <div style={{ fontSize: "1.2rem" }}>Utility sidebar coming...</div>
          </div>

          <div className="dashboard-panel">
            <h1>Songs</h1>
            <Input
              type={"text"}
              style={{
                width: "100%",
                marginTop: ".5rem",
                color: "white",
                backgroundColor: "#021726",
              }}
              placeholder="Search songs (Coming soon..)"
              onClick={() => alert("being made")}
            />
            {loading && <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
              <CircularProgress />
            </div>}
            {spotifyId &&
              <iframe
                // style="border-radius:12px"
                // @ts-ignore
                style={{ "border-radius": "12px" }}
                src={`https://open.spotify.com/embed/playlist/${spotifyId}?utm_source=generator`}
                width="100%"
                height="352"
                frameBorder="0"
                allowfullscreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy" />
            }

            {/* <div style={{ marginTop: "10rem" }}>
              <h1>testing</h1>
              <p>asdjskkljasdlaj</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
