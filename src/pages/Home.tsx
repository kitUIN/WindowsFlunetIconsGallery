import { totalDataState } from "@/atoms/local";
import AppIcon, { AppIconTree } from "@/components/AppIcon";
import { DirectoryTree } from "@rollup-plugin/rollup-plugin-pregit";
import {selector, useRecoilValue} from 'recoil';

function getPenultimateNodes(node?: DirectoryTree): AppIconTree[] {
  let result: AppIconTree[] = [];
  if (node?.children) {
    let f:boolean = false;
    node.children.forEach((child) => {
      if (child.children && child.children.length > 0) {
        f = true;
        result = result.concat(getPenultimateNodes(child));
      }
    })
    if (!f && node.children.length > 0) {
      result.push({
        name: node.name,
        path: node.children[0].path,
        more: false,
      });
    }
  }
  return result;
}
const homeData = selector({
  key: 'homeData',
  get: ({get}) => getPenultimateNodes(get(totalDataState)),
});

function Home() {
    const data = useRecoilValue(homeData);
  return (
    <div className="card-box">
      <div className="card">
        {data.map((item) => (
          <AppIcon key={item.path} item={item}></AppIcon>
        ))}
      </div>
    </div>
  );
}
export default Home;
