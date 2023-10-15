import styled from "styled-components";
import Input from "@mui/material/Input";

export default function LNLDashboard() {
  return (
    <div className="dashboard-page">
      <LNLHeader>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            padding: ".3rem",
            fontSize: "1.8rem",
          }}
        >
          Utiliy menu coming...
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
              style={{ width: "90%", marginTop: ".5rem" }}
              placeholder="Search projects (Coming soon..)"
              // disabled
              onClick={() => alert("being made")}
            />

            <h1>testing</h1>
            <p>asdjskkljasdlaj</p>
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
  background-color: #d3d3d3c7;
  h1 {
    margin: 0;
    padding: 0;
  }
`;

const LNLHeader = styled.header`
  display: flex;
  height: 8vh;
  padding: 0.5rem;
  background-color: #1e2530;
  border-top: 1px solid whitesmoke;
  border-bottom: 1px solid white;
  color: white;
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
  background-color: #2c3645;
  border-bottom: 1px solid white;
  border-right: 1px solid white;
  padding: 1rem;
`;

const DashboardPanel = styled.section`
  padding: 1rem;
  flex-grow: 1;
  overflow-y: auto;
`;
