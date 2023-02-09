import { Perlin, createPerlin } from "@latticexyz/noise";

import { Coord } from "@latticexyz/utils";

const createBananaMananger = () => {
  let perlin: Perlin;

  const setup = async () => {
    perlin = await createPerlin();
  };

  const isBananaOnTile = (position: Coord) => {
    const height = perlin(position.x, position.y, 0, 50);
    const heights = [];
    for (let i = 0; i < 100; i++) {
      heights.push(perlin(position.x + i, position.y + i, 0, 50));
    }
    console.log(heights);
  };

  return { setup, isBananaOnTile };
};

export default createBananaMananger;
