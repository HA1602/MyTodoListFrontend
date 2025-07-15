import Header from "./Header";
import Addtodo from "./Addtodo";
import GetAll from "./GetAll";

function App() {
  return (
    <div className="bg- bg-[#ffc300] min-h-full flex flex-col justify-between">
      <Header />
      <main className="flex-1 px-6 py-4">
        <GetAll />
      </main>
    </div>
  );
}

export default App;
