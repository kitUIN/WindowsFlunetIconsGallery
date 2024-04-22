import { useEffect } from "react";
import { pages as clientPages } from "./pages";
import { getTheme, themeAtom, totalDataState } from "@/atoms/local";
import { FluentProvider, makeStyles } from "@fluentui/react-components";
import { useAtomValue } from "jotai/react";
import { Tabs } from "./components/Tabs";
import { useSetRecoilState } from "recoil";
import { Route, Routes } from "react-router-dom";
import { LazyImportComponent } from "./components/LazyImportComponent";
const useStyles = makeStyles({
  provider: {
    width: "100%",
    height: "100%",
  },
});

function App() {
  const styles = useStyles();
  const theme = useAtomValue(themeAtom);
  const setAllData = useSetRecoilState(totalDataState);
  useEffect(() => {
    fetch("/icons/iconlist.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAllData(data);
      });
  }, [setAllData]);
  return (
    <div className="App">
      <FluentProvider className={styles.provider} theme={getTheme(theme)}>
        <div className="Nav">
          <Tabs />
          {/* <Divider vertical style={{ height: "100%" }} /> */}
          <div className="Routes">
            <Routes>
              {clientPages.map(({ path, element }, index) => (
                <Route
                  key={`${path}-${index}`}
                  path={path}
                  element={<LazyImportComponent lazyChildren={element} />}
                />
              ))}
            </Routes>
          </div>
        </div>
      </FluentProvider>
    </div>
  );
}
export default App;
