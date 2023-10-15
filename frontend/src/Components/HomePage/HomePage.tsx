import { useNavigate } from "react-router";
import Button from "../Layout/Button";
import { Link } from "react-router-dom";
import { color } from "@mui/system";

interface HomePageProps {}

export default function HomePage({}: HomePageProps) {
  return (
    <div>
      <div>What up guys</div>
      <body>
        <Link to="/face">
          <button type="button">
                Go to Face
          </button>
        </Link>
        <Link to="/PromptPage">
          <button type="button">
                Go to Prompt
          </button>
        </Link>
      </body>
      
    </div>
  );
}
