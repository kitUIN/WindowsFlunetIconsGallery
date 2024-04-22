import { FC, lazy, LazyExoticComponent } from 'react';
import {
  Home20Regular,Home20Filled,
  Info20Regular,Info20Filled,
  Settings20Regular,Settings20Filled,
  bundleIcon,
  type FluentIcon,
} from '@fluentui/react-icons';

export type NavigationItem = {
  label: string;
  path: string;
  icon: FluentIcon;
  element: LazyExoticComponent<FC>;
  top: boolean;
};

export const pages: NavigationItem[] = [
  {
    label: 'home',
    path: '/',
    icon: bundleIcon(Home20Filled, Home20Regular),
    element: lazy(() => import('./Home')),
    top: true
  },
  {
    label: 'settings',
    path: '/settings',
    icon: bundleIcon(Settings20Filled, Settings20Regular),
    element: lazy(() => import('./Home')),
    top: false
  },
  {
    label: 'about',
    path: '/about',
    icon: bundleIcon(Info20Filled, Info20Regular),
    element: lazy(() => import('./Home')),
    top: false
  }
];
