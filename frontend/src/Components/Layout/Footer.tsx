import Button from "@mui/material/Button";

interface FooterProps {}

export default function Footer({}: FooterProps): JSX.Element {
  return (
    <footer className="app-footer">
      <section className="section social-media-container">
        <h1>Visit our social medias</h1>
        <div className="social-media-links">Coming soon...</div>
      </section>

      <section className="section contact-section">
        <Button className="contact-btn">
          <a href={`mailto:example@gmail.com`} className="link">
            Have something to say? Contact us.
          </a>
        </Button>
      </section>

      <section className="section main-portion">
        <img
          src={
            "https://cdn3.vectorstock.com/i/1000x1000/29/27/note-music-colorful-rainbow-logo-icon-illus-vector-28932927.jpg"
          }
          width={40}
          alt={`look n listen logo`}
          className="logo"
        />
        <div className="title">Look 'n Listen. All rights reserved.</div>
      </section>
    </footer>
  );
}
