const PlayerCount = () => {
  return (
    <div className="container-gamestats">
      <div className="flex">
        <div className="h-10 w-10">[img]</div>
        <div className="ml-2">
          {/* TODO: Add function to dynamically calc player count */}
          <div className="bignumber flex items-center">64</div>
        </div>
      </div>
    </div>
  );
};
export default PlayerCount;
