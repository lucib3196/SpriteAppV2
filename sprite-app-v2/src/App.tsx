import Navbar from "./components/NavBar";
import Chat from "./components/Chat/Chat";
import Hero from "./pages/Hero";
import Features from "./features/AppFeatures";
import PromptThemes from "./features/PromptTheme";
import Gallery from "./features/Gallery";
import Footer from "./components/Footer";

// export default function App() {
//   return (
//     <div className="min-h-screen bg-[#0e0c1a] text-purple-50">
//       <div className="max-w-6xl mx-auto">
//         <Navbar />
//       </div>
//       <Hero />
//       <div className="max-w-6xl mx-auto">
//         <Features />
//       </div>
//       <PromptThemes />
//       <Gallery />
//       <Footer />
//     </div>
//   );
// }

export default function App() {
  return (
    <div className="min-h-screen bg-[#0e0c1a] text-purple-50">
      <div className="max-w-6xl mx-auto">
        <Navbar />
      </div>
      <Chat/>
    </div>
  );
}