import { spawn } from "cross-spawn";
import fs from "fs";
import path from "path";

import { promisify } from "util";
interface Options {
  giturl?: string;
  staticDir: string;
}
export type Icon = {
  name: string;
  path: string;
};
export interface DirectoryTree {
  name: string;
  path: string;
  children?: DirectoryTree[];
}
const excludes =["重建图标缓存.bat", ".gitignore", ".git","README.md","FileTypeIcon.fig"]
function loadDirectoryTree(basePath: string): DirectoryTree {
  const directoryTree: DirectoryTree = {
    name: path.basename(basePath),
    path: basePath,
  };
  const st = fs.statSync("dist/" + basePath);
  if (st.isDirectory()) {
    directoryTree.children = fs
      .readdirSync("dist/" + basePath)
      .filter((fi) => !fi.startsWith("."))
      .map((childPath) => {
        return loadDirectoryTree(path.join(basePath, childPath));
      }).filter((child) =>  !(child.name in excludes) );
  }
  return directoryTree;
}

// const iconList = new Array<Icon>();

function geticons(giturl: string, path: string) {
  return new Promise<string>((resolve, reject) => {
    const child = spawn("git", ["clone",  giturl, path]);
    let output = "";
    child.stdout.on("data", (d) => {output += String(d);console.log(d);} );
    child.on("close", () => {
      resolve(output);
    });
    child.on("error", reject);
  });
}

const writeFileAsync = promisify(fs.writeFile);
function preGitPlugin(
  options: Options = {
    staticDir: "icons",
  }
) {
  return {
    name: "rollup-plugin-pregit",
    writeBundle: () => {
      try {
        if (options.giturl) {
          console.log("[git] 下载图标:" + options.giturl);
          if(fs.existsSync("public/" + options.staticDir)){
            console.info("[git] 删除旧图标成功");
            spawn("rmdir", ["--ignore-fail-on-non-empty", options.staticDir]);
          }
          geticons(options.giturl, "dist/" + options.staticDir).then(() => {
            console.info("[git] 下载图标成功");
            // 删除README文件
            // spawn("rm", [path.resolve(options.staticDir, "README.md")]);
            // console.info("[git] 删除README文件成功");
            // console.info(iconList);
            writeFileAsync(
              path.join("dist/" + options.staticDir, `iconlist.json`),
              JSON.stringify(loadDirectoryTree(options.staticDir))
            );
          });
        }
      } catch (e) {
        console.error(e);
      }
    },
  };
}

export default preGitPlugin;
