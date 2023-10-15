import styled from "styled-components";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

export default function LNLDashboard() {
  return (
    <div className="dashboard-page">
      <LNLHeader>
        <div>Utiliy menu coming...</div>
        <div>
          <Button variant="contained" href="/face">
            Face
          </Button>
          <Button variant="contained">asd</Button>
        </div>
      </LNLHeader>

      <DashboardContainer>
        <LNLDashboardContainer>
          <DashboardSidebar>
            <div style={{ fontSize: "1.2rem" }}>Utility sidebar coming...</div>
          </DashboardSidebar>

          <DashboardPanel>
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
          </DashboardPanel>
        </LNLDashboardContainer>
      </DashboardContainer>
    </div>
  );
}

// will contain utility menu for settings like changing password
const DASHBOARD_MIN_HEIGHT = "100vh";

const DashboardContainer = styled.div`
  position: relative;
  min-height: ${DASHBOARD_MIN_HEIGHT};
  width: 100%;
  background-color: #02101b;
  color: white;

  h1 {
    margin: 0;
    padding: 0;
  }
`;

const LNLHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0.5rem;
  background-color: #03121e;
  border-top: 1px solid whitesmoke;
  border-bottom: 1px solid white;
  color: white;
  font-size: 1.8rem;
`;

// after-authorization styles
const LNLDashboardContainer = styled.div`
  display: flex;
  width: 100%;
`;

const DashboardSidebar = styled.section`
  width: 12.5vw;
  height: ${DASHBOARD_MIN_HEIGHT};
  color: white;
  background-color: #021b2d;
  border-bottom: 1px solid white;
  border-right: 1px solid white;
  padding: 1rem;
`;

const DashboardPanel = styled.section`
  padding: 1rem;
  flex-grow: 1;
  overflow-y: auto;
`;
