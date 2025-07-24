import ReviewEditor from "./ReviewEditor";

function App() {
  return (
    <div>
      <main className="max-w-[800px] mx-auto mt-12">
        <div>
          <p className="text-xl">
            An editor that converts poker hand input suits to emojis. <br />
            Automatically converts As → A♠️ (paste supported)
          </p>
        </div>
        <div className="mt-4">
          <ReviewEditor />
        </div>
      </main>
    </div>
  );
}

export default App;
