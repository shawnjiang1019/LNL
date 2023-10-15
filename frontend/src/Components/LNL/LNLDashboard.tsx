import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

interface LNLDashboardProps {}
export default function LNLDashboard({}: LNLDashboardProps) {
  const handleReset = () => {
    localStorage.removeItem("prompt");
    localStorage.removeItem("description");
    localStorage.removeItem("imgSrc");
  };

  return (
    <div className="dashboard-page">
      <header className="lnl-header">
        <div>Utiliy menu coming...</div>
        <div>
          <Button
            className=""
            variant="contained"
            color="inherit"
            style={{ color: "black", width: "6rem" }}
            href="/face"
          >
            Face
          </Button>
          <Button
            className=""
            variant="contained"
            color="inherit"
            style={{ color: "black", width: "6rem" }}
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
            color="success"
            style={{ color: "white", padding: "0.5rem 4rem", width: "6rem" }}
            href="/scan"
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
