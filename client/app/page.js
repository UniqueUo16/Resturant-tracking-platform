// page.js

import End from "./components/Ending";
import HeroCarousel from "./components/HeroCarousel";
import Newsletter from "./components/Service";
import Sidebar from "./components/Sidebar";
import Story from './components/Story';
import Menu from "./components/menu";

export default function Home() {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="sm:w-[300px] sticky sm:block ">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full">
        <HeroCarousel />
        <Newsletter />
        <Story/>
        <Menu/>
        <End/>
      </main>
    </div>
  );
}
