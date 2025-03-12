import * as React from 'react';
import loadable, { LoadableComponent } from '@loadable/component';

const fallback = <div className="c-loader" />;

// prettier-ignore
export const Login: LoadableComponent<any> = loadable(() => import('@containers/auth/login'), { fallback });

// prettier-ignore
export const Signup: LoadableComponent<any> = loadable(() => import('@containers/auth/signup'), { fallback });

// prettier-ignore
export const PasswordReset: LoadableComponent<any> = loadable(() => import('@containers/auth/password-reset'), { fallback });

export const NewProject: LoadableComponent<any> = loadable(() => import('@containers/NewProject/index'), { fallback });
export const MyOrders: LoadableComponent<any> = loadable(() => import('@containers/MyOrders/index'), { fallback });

// prettier-ignore
export const Home: LoadableComponent<any> = loadable(() => import('@containers/home'), { fallback });
export const Profile: LoadableComponent<any> = loadable(() => import('@containers/profile'), { fallback });
