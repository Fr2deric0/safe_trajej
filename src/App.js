import Carte from "./components/map";

import Styles from "./css/App.css";
import Resultatsearch from "./components/resultatsearch";

export default function App() {
  return (
    <div className="App">
        <Carte />
        <Resultatsearch />
    </div>
  );
}
