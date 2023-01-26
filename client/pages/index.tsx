import Head from "next/head";
import Lobby from "../components/lobby/Lobby";
import NetworkLoader from "../components/NetworkLoader";

export default function Home() {
  return (
    <>
      <Head>
        <title>Ape&apos;s Gambit</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NetworkLoader>
          <Lobby />
        </NetworkLoader>
      </main>
    </>
  );
}
