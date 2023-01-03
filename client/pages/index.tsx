import GameLoader from "../components/game/GameLoader";
import Head from "next/head";
import NetworkProvider from "../context/NetworkContext";

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
        <NetworkProvider>
          <div>
            <p className="font-bold">tailwind + next</p>
          </div>
          <GameLoader />
        </NetworkProvider>
      </main>
    </>
  );
}
