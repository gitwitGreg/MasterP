import Search from "./components/Search";
import Popular from "./components/Popular";
import Closest from "./components/Closest";
import Planned from "./components/Planned";
import FooterComp from "./components/FooterComp";


export default async function Home() {

  /** Show popular events */

  /** Show a few planned events */

  return (
    <main className="flex h-screen flex-col items-center">
      <Search /> 
      <Popular />
      <Closest /> 
      <Planned />
      <FooterComp/>
    </main>
  );
}
