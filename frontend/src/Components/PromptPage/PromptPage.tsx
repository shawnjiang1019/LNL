import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";


export default function PromptPage() {
  const [prompt, setPrompt] = useState("");
  const [promptHelper, setPromptHelper] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleNewPrompt = () => {
    console.log(prompt, description);

    if (prompt.length === 0) {
      setPromptHelper("Prompt cannot be empty");
      return;
    }

    localStorage.setItem("prompt", prompt);
    localStorage.setItem("description", description);

    navigate("/lnl");
    setTimeout(() => {
      console.log("hmmmm");
    }, 3000);
  };

  return (
<<<<<<< HEAD
    <div>
        <form>
      <fieldset>
         <label>
           <p>Tell us about your emotions</p>
           <input name="name" />
         </label>
       </fieldset>
       <button type="submit">Submit</button>
      </form>
      
=======
    <div className="prompt-page">
      <div>
        <h1 style={{ marginBottom: ".7rem" }}>Create your prompt</h1>
        <TextField
          placeholder="Your prompt..."
          label="Prompt"
          className="prompt-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          error={promptHelper.length !== 0}
          helperText={promptHelper}
        />
        <h2 style={{ marginTop: "3rem" }}>Description</h2>
        <TextareaAutosize
          placeholder="Your description..."
          style={{ width: "50vw", height: "60vh" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button
          variant="contained"
          color="inherit"
          style={{ color: "black", padding: "0.5rem 3rem" }}
          onClick={handleNewPrompt}
        >
          Submit
        </Button>
      </div>

      <div className="banner">
        <img
          src="https://i.gifer.com/JcC.gif"
          alt="calm gif"
          style={{
            width: "30vw",
            height: "150vh",
            marginLeft: "5rem",
          }}
        />
      </div>
>>>>>>> c261b11bf97bc381f9e1ffed149d8f24a0735e10
    </div>
  );
}
