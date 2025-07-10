import Header from "./Header";
import Addtodo from "./Addtodo";
import GetAll from "./GetAll";

function App() {
  return (
    <div className="bg- bg-[#161B40] min-h-screen flex flex-col justify-between">
      <Header />
      <main className="flex-1 px-6 py-4">
        <Addtodo />
        <GetAll />
      </main>
    </div>
  );
}

export default App;
