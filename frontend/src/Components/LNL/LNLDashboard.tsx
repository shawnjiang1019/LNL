import React, { useState, useEffect } from "react";

import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

import { toast } from "react-toastify";
import axios from "axios";

interface LNLDashboardProps {}
export default function LNLDashboard({}: LNLDashboardProps) {
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

  const handleScan = async () => {
    if (!imgSrc) {
      alert("Please add a photo");
      return;
    }
    if (!prompt) {
      alert("Please add a prompt");
      return;
    }

    // console.log(localStorage.getItem('imgSrc'))
    // const res = await axios.post("http://localhost:5500/input", {
    //   prompt: localStorage.getItem("prompt"),
    //   // description: localStorage.getItem("description"),
    //   imgSrc: localStorage.getItem("imgSrc"),
    // })

    const res = await axios.post("http://localhost:5500/getEmotions", {
      // payload: localStorage.getItem("imgSrc"),
      payload: "askdjaslkdjalkdj",
    });
    console.log(res);

    toast.info("Scanning...");
    // toast.success("Done...");
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

            <div style={{ marginTop: "10rem" }}>
              <h1>testing</h1>
              <p>asdjskkljasdlaj</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
