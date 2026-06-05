// src/App.tsx

import { useLenis } from "./hooks/useLenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Particles from "./components/Particles";
import AlienSection from "./components/AlienSection";
import { aliens } from "./data/aliens";

function App() {
  useLenis();

  return (
    <main className="bg-void">
      <Particles />
      <Navbar />
      <Hero />
      {aliens.map((alien, i) => (
        <AlienSection
          key={alien.id}
          alien={alien}
          index={i}
          total={aliens.length}
        />
      ))}
      {/* <div className="h-screen bg-void" /> */}
    </main>
  );
}

export default App;
