import Header from "../Header/Header";
import Hero from "../Hero/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <Hero>
        <h3 className="welcome" style={{color:"#rgb(13 24 78)"}}>Welcome Janesh!</h3>
      </Hero>
    </>
  );
}
