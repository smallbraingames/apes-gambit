const SummaryCard = () => {
  return (
    <div className="relative flex flex-col w-full items-center m-4 px-4 pt-4 pb-2  bg-yellow-400 bg-opacity-95 rounded-lg">
      <div className="w-full flex flex-col items-center h-auto transform -translate-y-16">
        <span className="flex items-center justify-center w-24 h-24 rounded-full border-2 border-yellow-800  bg-yellow-400">
          {/* {/* TODO: Dynamically display win/lose icons */}
          <img src="/icons/winner.svg" width="72" />
        </span>
        <h1 className="font-bold text-6xl mb-2 ml-1 h-0 uppercase text-center text-yellow-400 text-outline-1">
          You Win
        </h1>
      </div>
      {/* TODO - Setup key and for loop */}
      <div className="block w-full">
        <div className="grid grid-cols-2 gap-2 rounded-xl w-full text-gray-800 py-2 pl-2 pr-4 my-2 border border-yellow-900 bg-opacity-10 bg-yellow-600 hover:bg-opacity-40 cursor-pointer">
          <div className="inline-block">
            {/* TODO: Dynamically display var-specific icons */}
            <img src="/icons/winner.svg" width="64" />
          </div>
          <div className="text-right">
            {/* TODO: Dynamically display label + value for each var */}
            <div className="label">RANK</div>
            <div className="bignumber">01</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 rounded-xl w-full text-gray-800 py-2 pl-2 pr-4 my-2 border border-yellow-900 bg-opacity-10 bg-yellow-600 hover:bg-opacity-40 cursor-pointer">
          <div className="inline-block">
            {/* TODO: Dynamically display var-specific icons */}
            <img src="/icons/winner.svg" width="64" />
          </div>
          <div className="text-right">
            <div className="label">RANK</div>
            <div className="bignumber">01</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 rounded-xl w-full text-gray-800 py-2 pl-2 pr-4 my-2 border border-yellow-900 bg-opacity-10 bg-yellow-600 hover:bg-opacity-40 cursor-pointer">
          <div className="inline-block">
            {/* TODO: Dynamically display var-specific icons */}
            <img src="/icons/winner.svg" width="64" />
          </div>
          <div className="text-right">
            <div className="label">RANK</div>
            <div className="bignumber">01</div>
          </div>
        </div>
      </div>
      <button className="btn btn-primary w-full">COLLECT CROWN</button>
    </div>
  );
};

export default SummaryCard;
