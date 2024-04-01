
import { spawn } from "cross-spawn";
import fs from "fs";
import path from "path";
import {promisify} from 'util';
interface Options {
  giturl?: string;
  staticDir: string;
}
export type Icon = {
  name: string;
  path: string;
}
const iconList = new Array<Icon>();

function geticons(giturl: string, path: string) {
  return new Promise<string>((resolve, reject) => {
    const child = spawn("git", ["clone", giturl, path]);
    let output = "";
    child.stdout.on("data", (d) => (output += String(d)));
    child.on("close", () => {
      resolve(output);
    });
    child.on("error", reject);
  });
}

function geticonslist(uri: string) {
  const files = fs.readdirSync(uri);
  files.forEach((file) => {
    if(!file.startsWith(".") && !file.endsWith(".md")){
      const fPath = path.join(uri, file);
      const stats= fs.statSync(fPath);
      if (stats.isDirectory()) {
        geticonslist(fPath);
      } else {
        iconList.push({name:path.basename(fPath),path:fPath.replace("dist", "")});
      }
    }
  });
}
const writeFileAsync = promisify(fs.writeFile);
function preGitPlugin(
  options: Options = {
    staticDir: 'dist/icons',
  }
) {
  return {
    name: "rollup-plugin-pregit",
    writeBundle: () => {
      try {
        if (options.giturl) {
          console.log("[git] 下载图标:" + options.giturl);
          // if(fs.existsSync(options.staticDir)){
          //   console.info("[git] 删除旧图标成功");
          //   spawn("rmdir", ["--ignore-fail-on-non-empty", options.staticDir]);
          // }
          // Sleep(2000);
          geticons(options.giturl, options.staticDir).then(() => {
            console.info("[git] 下载图标成功");
            // 删除README文件
            // spawn("rm", [path.resolve(options.staticDir, "README.md")]);
            // console.info("[git] 删除README文件成功");
            geticonslist(options.staticDir);
            // console.info(iconList);
            writeFileAsync(path.join(options.staticDir, `iconlist.json`), JSON.stringify(iconList));
          });
        }
      } catch (e) {
        console.error(e);
      }
    },
  };
}

export default preGitPlugin;
