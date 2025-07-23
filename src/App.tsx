import "./App.css";
import ReviewEditor from "./ReviewEditor";

function App() {
  return (
    <div>
      <h3>
        ポーカーのハンド入力をアシストするエディターです。例えばAsをA♠️に自動で変換します
      </h3>
      <ReviewEditor />
    </div>
  );
}

export default App;
