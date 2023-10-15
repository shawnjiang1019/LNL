import { useEffect } from "react";
import axios from "axios";

import HomePage from "./Components/HomePage/HomePage";
import Header from "./Components/Layout/Header";
import "./App.css";

export default function App() {
  useEffect(() => {
    (async () => {
      const data = await axios.get(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
      console.log(data.data);

      // const p = await axios.post(
      //   "https://jsonplaceholder.typicode.com/todos/1",
      //   {
      //     img: "data:image/jpeg;base64,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",
      //   }
      // );
    })();
  }, []);

  return (
    <div>
<<<<<<< HEAD
      {/* <Header /> */}
=======
>>>>>>> c07ac163e1c6c93222d5d8a8e9b9a81934144d4e
      <HomePage />
    </div>
  );
}
