import Button from "@mui/material/Button";

interface HomePageProps {}

export default function HomePage({}: HomePageProps) {
  return (
    <div>
      <div className="homepage-panel-1">
        <div className="side left-side">
          <div className="headertop">
            Build your best ideas together, in LNL App
          </div>
          <div className="headerbot">
            Create local and personally curated music and from any device.
          </div>

          <a href="/lnl">
            <Button variant="contained" className="lnl-direct">
              Start Listening
            </Button>
          </a>
        </div>

        <div className="side right-side">
          <img
            className="dashboard-img"
            src="https://wallpapers.com/images/high/neon-purple-gospel-musical-notes-vdtcr7od76w200ah.webp"
          />
        </div>
      </div>

      <div className="app">
        <div className="homepage-panel-1">
          <div className="side right-side">
            <img
              className="dashboard-img"
              src="https://wallpapers.com/images/high/neon-purple-gospel-musical-notes-vdtcr7od76w200ah.webp"
              // width="500"
            />
          </div>

          <div className="side left-side">
            <div className="headertop">Lorem ipsum dolor sit amet.</div>
            <div className="headerbot">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis
              dolores blanditiis optio doloremque qui deleniti ipsa quo earum!
              Maxime, rem veritatis totam voluptatum facere aperiam error vero
              atque molestias pariatur.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
