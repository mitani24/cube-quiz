export type Cube = {
  id: string;
  type: "F2L" | "OLL" | "PLL";
  imagePath: {
    cube: string;
    cubeWithMove: string;
  };
};

export const f2lCubes: Cube[] = Array.from({ length: 41 }, (_, i) => {
  const cubeNumber = (i + 1).toString().padStart(2, "0");
  const id = `f2l_${cubeNumber}`;
  return {
    id,
    type: "F2L",
    imagePath: {
      cube: `/cubes/${id}.png`,
      cubeWithMove: `/cubes-with-move/${id}.png`,
    },
  };
});

export const ollCubes: Cube[] = Array.from({ length: 57 }, (_, i) => {
  const cubeNumber = (i + 1).toString().padStart(2, "0");
  const id = `oll_${cubeNumber}`;
  return {
    id,
    type: "OLL",
    imagePath: {
      cube: `/cubes/${id}.png`,
      cubeWithMove: `/cubes-with-move/${id}.png`,
    },
  };
});

export const pllCubes: Cube[] = Array.from({ length: 21 }, (_, i) => {
  const cubeNumber = (i + 1).toString().padStart(2, "0");
  const id = `pll_${cubeNumber}`;
  return {
    id,
    type: "PLL",
    imagePath: {
      cube: `/cubes/${id}.png`,
      cubeWithMove: `/cubes-with-move/${id}.png`,
    },
  };
});

export const cubes: Cube[] = [...f2lCubes, ...ollCubes, ...pllCubes];
