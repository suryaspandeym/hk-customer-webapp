import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authContext from '@contexts/AuthContext';
import GlobalNavbar from '@components/GlobalNavbar';
import NavSidebar from '@components/NavSidebar';
import AppRoutes from '@utilities/app-routes';
import { FaRegBuilding } from 'react-icons/fa';
import { menuItemRenderer } from '@components/NavSidebar/utils';
import { matchRoutes, useLocation, useNavigate } from 'react-router';
import { ROUTES } from '@src/app';
import { MdOutlineAddHomeWork } from 'react-icons/md';
import { TbSitemap } from 'react-icons/tb';
import { FaMoneyCheckDollar } from 'react-icons/fa6';
import { CustomerActionType } from '@store/branches/customer/enums';
import { FaWandMagicSparkles } from 'react-icons/fa6';

export const RootLayout: React.FunctionComponent<any> = ({ children }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showSidebar, setShowSidebar] = useState(true);
	const { pathname } = useLocation();
	const { isUserLoading, user, setUser, logout } = useContext(authContext) as any;
	const matchedRoutes = matchRoutes(ROUTES, pathname)?.map(route => route.route.path) || [];

	useEffect(() => {
		if (user?.userId === undefined) {
			dispatch({
				type: CustomerActionType.FETCH_CUSTOMER_DETAILS,
				payload: {
					successCB: userRes => {
						setUser(userRes);
					}
				}
			});
		}
	}, []);

	const MENU_ITEMS = [
		{
			key: 'new-project',
			label: 'New Project',
			route: AppRoutes.NEW_PROJECT,
			icon: <FaWandMagicSparkles />,
			template: menuItemRenderer,
			activeKeys: matchedRoutes,
			command: () => {
				navigate(AppRoutes.NEW_PROJECT);
			}
		},
		{
			key: 'myOrders',
			label: 'My Orders',
			icon: <TbSitemap />,
			route: AppRoutes.MY_ORDERS,
			template: menuItemRenderer,
			activeKeys: matchedRoutes,
			command: () => {
				navigate(AppRoutes.MY_ORDERS);
			}
		},
		{
			key: 'savedProjects',
			label: 'Saved Projects',
			icon: <MdOutlineAddHomeWork />,
			route: AppRoutes.SAVED_PROJECTS,
			template: menuItemRenderer,
			activeKeys: matchedRoutes,
			command: () => {
				navigate(AppRoutes.SAVED_PROJECTS);
			}
		},
		{
			key: 'contactUs',
			label: 'Contact Us',
			route: AppRoutes.CONTACT_US,
			template: menuItemRenderer,
			icon: <FaRegBuilding />,
			activeKeys: matchedRoutes,
			command: () => {
				navigate(AppRoutes.CONTACT_US);
			}
		},
		{
			key: 'chat',
			label: 'Chat',
			icon: <FaMoneyCheckDollar />,
			route: AppRoutes.CHAT,
			template: menuItemRenderer,
			activeKeys: matchedRoutes,
			command: () => {
				navigate(AppRoutes.CHAT);
			}
		}
	];

	return (
		<>
			<div className="antialiased grow flex">
				{showSidebar && (
					<NavSidebar
						show={showSidebar}
						menuList={MENU_ITEMS}
						onClose={() => {
							setShowSidebar(false);
						}}
					/>
				)}
				<div className="w-full bg-gray-100 " aria-expanded="true">
					<GlobalNavbar
						logout={logout}
						isUserLoading={isUserLoading}
						user={user || {}}
						matchedRoutes={matchedRoutes}
						handleMenuIconClick={() => setShowSidebar(prev => !prev)}
					/>
					<div className="h-[95vh] my-36 p-8 overflow-scroll bg-white">{children}</div>
				</div>
			</div>
		</>
	);
};

export default RootLayout;
