import DeleteTransactionFromTransactionIdContextProvider from "../../store/DeleteTransactionFromTransactionIdContext/DeleteTransactionFromTransactionIdContext";
import DeleteTransaction from "../DeleteTransaction/DeleteTransaction";
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
        <hr />
        <br />
        <br />
        <DeleteTransactionFromTransactionIdContextProvider>
          <DeleteTransaction />
        </DeleteTransactionFromTransactionIdContextProvider>
      </Hero>
    </>
  );
}
