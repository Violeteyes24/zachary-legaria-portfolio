import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Experience />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}
