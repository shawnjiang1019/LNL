import styled from "styled-components";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

export default function LNLDashboard() {
  return (
    <div className="dashboard-page">
      <header className="lnl-header">
        <div>Utiliy menu coming...</div>
        <div>
          <Button
            className=""
            variant="contained"
            color="inherit"
            style={{ color: "black" }}
            href="/face"
          >
            Face
          </Button>
          <Button variant="contained">Prompt</Button>
        </div>
        <div style={{ float: "right" }}>
          <a href="/face">
            <Button variant="contained">Scan</Button>
          </a>
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
              // disabled
              onClick={() => alert("being made")}
            />

            <div>
              <h1>testing</h1>
              <p>asdjskkljasdlaj</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
