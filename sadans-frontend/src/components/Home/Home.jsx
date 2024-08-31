import GetClientIdFromNameContextProvider from "../../store/GetClientIdFromNameContext/GetClientIdFromNameContext";
import GetClientNameContextProvider from "../../store/GetClientNameContext/GetClientNameContext";
import GetLastNTransactionContextProvider from "../../store/GetLastNTransactionContext/GetLastNTransactionContext";
import GetLastNTransaction from "../GetLastNTransaction/GetLastNTransaction";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <Hero>
        <h3 className="welcome" style={{ color: "rgb(13 24 78)" }}>
          Welcome Janesh!
          <br />
        </h3>
        <GetClientNameContextProvider>
          <GetClientIdFromNameContextProvider>
            <GetLastNTransactionContextProvider>
              <GetLastNTransaction />
            </GetLastNTransactionContextProvider>
          </GetClientIdFromNameContextProvider>
        </GetClientNameContextProvider>
      </Hero>
    </>
  );
}
