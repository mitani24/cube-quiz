import { Cube, cubes, f2lCubes, ollCubes, pllCubes } from "./cubes";

export type CubeSetting = {
  id: string;
  enabled: boolean;
};

export type Setting = {
  f2l: CubeSetting[];
  oll: CubeSetting[];
  pll: CubeSetting[];
};

const defaultSetting: Setting = {
  f2l: f2lCubes.map((cube) => ({ id: cube.id, enabled: true })),
  oll: ollCubes.map((cube) => ({ id: cube.id, enabled: true })),
  pll: pllCubes.map((cube) => ({ id: cube.id, enabled: true })),
};

export const loadSetting = (): Setting => {
  const setting = localStorage.getItem("setting");
  if (!setting) {
    return defaultSetting;
  }

  return JSON.parse(setting);
};

export const saveSetting = (setting: Setting) => {
  localStorage.setItem("setting", JSON.stringify(setting));
};
