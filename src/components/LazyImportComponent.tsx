/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, LazyExoticComponent, ReactNode, Suspense } from 'react';
import { FluentProvider, Spinner } from '@fluentui/react-components';
import { useAtomValue } from 'jotai';
import { getTheme, themeAtom } from '@/atoms/local';

interface LazyImportComponentProps {
  lazyChildren: LazyExoticComponent<FC<any>>;
  lazyProps?: any;
  children?: ReactNode;
}

export const LazyImportComponent: FC<LazyImportComponentProps> = (props) => {
  const theme = useAtomValue(themeAtom);
  return (
    <Suspense fallback={
      <FluentProvider theme={getTheme(theme)}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Spinner size="huge" label="Loading" />
        </div>
      </FluentProvider>}>
      <props.lazyChildren {...props.lazyProps}>
        {props.children}
      </props.lazyChildren>
    </Suspense>
  );
};