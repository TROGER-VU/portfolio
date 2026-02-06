import { Draggable } from "gsap/Draggable";
import gsap from "gsap";
gsap.registerPlugin(Draggable);

import { Dock, Home, Navbar, Welcome } from "#components"
import { Finder, Resume, Safari, Terminal, Text, Image, Contact, Photos } from "#windows";

const App = () => {
  return (
    <main>
      <Navbar/>
      <Welcome/>
      <Dock/>
      <Home/>

      <Terminal/>
      <Safari/>
      <Resume/>
      <Text/>
      <Image/>
      <Finder/>
      <Contact/>
      <Photos/>
    </main>
  )
}

export default App