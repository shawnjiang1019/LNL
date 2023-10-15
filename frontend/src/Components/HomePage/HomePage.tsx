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

          <a href="/face">
            <Button variant="contained" className="lnl-direct">
              Start Listening
            </Button>
          </a>
        </div>

        <div className="side right-side">
          <img
            className="dashboard-img"
            src="https://images.ctfassets.net/9haz2glq4wt0/3xY2T0RH0qoiyJWD0SS0CI/b4b3949bdf1420e9c34200f6d7429a12/1_14H3oKuTWKAhO95WRu3xzA.png"
          />
        </div>
      </div>

      <div className="app">
        <div className="homepage-panel-1">
          <div className="side right-side">
            <img
              className="dashboard-img"
              src="https://images.ctfassets.net/9haz2glq4wt0/3xY2T0RH0qoiyJWD0SS0CI/b4b3949bdf1420e9c34200f6d7429a12/1_14H3oKuTWKAhO95WRu3xzA.png"
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
