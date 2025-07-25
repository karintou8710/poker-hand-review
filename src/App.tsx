import ReviewEditor from "./ReviewEditor";

function App() {
  return (
    <div>
      <main className="max-w-3xl mx-auto mt-6 md:mt-12">
        <div>
          <p className="md:text-xl mx-4 md:mx-0">
            An editor that converts poker hand input suits to emojis. <br />
            Automatically converts As →
            <span className="card-node spade">A</span> (paste supported)
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
