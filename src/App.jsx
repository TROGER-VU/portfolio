import { Draggable } from "gsap/Draggable";
import gsap from "gsap";
gsap.registerPlugin(Draggable);

import { Dock, Navbar, Welcome } from "#components"
import { Finder, Resume, Safari, Terminal, Text, Image, Contact } from "#windows";

const App = () => {
  return (
    <main>
      <Navbar/>
      <Welcome/>
      <Dock/>

      <Terminal/>
      <Safari/>
      <Resume/>
      <Text/>
      <Image/>
      <Finder/>
      <Contact/>
    </main>
  )
}

export default App