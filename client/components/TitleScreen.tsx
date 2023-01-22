import { useState } from "react";
import Image from "next/image";

const TitleScreen = () => {
  const [start, setStart] = useState(false);
  return start ? null : (
    <div className="bg-blue-800 bg-opacity-50 h-full w-full fixed flex items-start justify-center">
      <div className="flex flex-col justify-center rounded-xl  w-full max-w-2xl p-8">
        <div className="flex flex-wrap justify-center">
          <Image
            src="/img-ag-logo.png"
            layout="fixed"
            width="560"
            height="300"
            alt="Ape's Gambit"
          />
          <div className="transform -translate-y-12">
            <Image
              src="/img-ag-logo--pieces.png"
              layout="fixed"
              width="360"
              height="200"
              alt="Ape Frens"
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button className="btn btn-primary" onClick={() => setStart(true)}>
            Play
          </button>
          <button className="btn btn-secondary">Help</button>
        </div>
      </div>
    </div>
  );
};

export default TitleScreen;
