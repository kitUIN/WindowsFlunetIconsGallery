import { webDarkTheme, webLightTheme } from "@fluentui/react-components";
import { DirectoryTree } from "@rollup-plugin/rollup-plugin-pregit";
import { atom } from "recoil";
import { atomWithStorage } from "jotai/utils";
// 主题
export const themeAtom = atomWithStorage("Theme", "DefaultLight");
export const totalDataState = atom<DirectoryTree>({
  key: "totalDataState",
  default: { name: "root", path: "root" },
});
export function getTheme(themeName: string) {
  switch (themeName) {
    case "DefaultDark":
      return webDarkTheme;
    case "DefaultLight":
      return webLightTheme;
    default:
      return webLightTheme;
  }
}
