import React, { useContext, useEffect, useState } from 'react';
import { UserActionType } from '@store/branches/user/enums';
import { useDispatch } from 'react-redux';
import authContext from '@contexts/AuthContext';
import GlobalNavbar from '@components/GlobalNavbar';
import NavSidebar from '@components/NavSidebar';
import AppRoutes from '@utilities/app-routes';
import { FaRegBuilding } from 'react-icons/fa';
import { IoPeopleOutline } from 'react-icons/io5';
import { BsCalendarDate, BsExclamationCircle } from 'react-icons/bs';
import { menuItemRenderer } from '@components/NavSidebar/utils';
import { matchRoutes, useLocation, useNavigate } from 'react-router';
import { ROUTES } from '@src/app';
import { BiCategory } from 'react-icons/bi';
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import { MdOutlineAddHomeWork } from 'react-icons/md';
import { MdOutlineMapsHomeWork } from 'react-icons/md';
import { TbSitemap } from 'react-icons/tb';
import { LiaElementor } from 'react-icons/lia';
import { FaMoneyCheckDollar } from 'react-icons/fa6';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

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
				type: UserActionType.FETCH_USER_DETAILS,
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
			key: 'leads',
			label: 'Leads',
			route: AppRoutes.LEADS,
			icon: <IoPeopleOutline />,
			template: menuItemRenderer,
			activeKeys: matchedRoutes,
			command: () => {
				navigate(AppRoutes.LEADS);
			}
		},
		{
			key: 'products',
			label: 'Products',
			icon: <TbSitemap />,
			route: AppRoutes.PRODUCTS,
			template: menuItemRenderer,
			activeKeys: matchedRoutes,
			items: [
				{
					key: 'all-categories',
					label: 'All Categories',
					route: AppRoutes.ALL_CATEGORIES,
					icon: <BiCategory />,
					template: menuItemRenderer,
					activeKeys: matchedRoutes,
					command: () => {
						navigate(AppRoutes.ALL_CATEGORIES);
					}
				},
				{
					key: 'all-products',
					label: 'All Products',
					route: AppRoutes.ALL_PRODUCTS,
					icon: <LiaElementor />,
					template: menuItemRenderer,
					activeKeys: matchedRoutes,
					command: () => {
						navigate(AppRoutes.ALL_PRODUCTS);
					}
				},
				{
					key: 'all-warranty',
					label: 'All Warranty',
					route: AppRoutes.ALL_WARRANTY,
					icon: <VscWorkspaceTrusted />,
					template: menuItemRenderer,
					activeKeys: matchedRoutes,
					command: () => {
						navigate(AppRoutes.ALL_WARRANTY);
					}
				}
			]
		},
		{
			key: 'inspirations',
			label: 'Inspirations',
			icon: <MdOutlineAddHomeWork />,
			route: AppRoutes.INSPIRATIONS,
			template: menuItemRenderer,
			activeKeys: matchedRoutes,
			items: [
				{
					key: 'all-inspirations',
					label: 'All Inspirations',
					route: AppRoutes.ALL_INSPIRATIONS,
					icon: <MdOutlineMapsHomeWork />,
					template: menuItemRenderer,
					activeKeys: matchedRoutes,
					command: () => {
						navigate(AppRoutes.ALL_INSPIRATIONS);
					}
				}
			]
		},
		{
			key: 'projects',
			label: 'Projects',
			route: AppRoutes.PROJECTS,
			template: menuItemRenderer,
			icon: <FaRegBuilding />,
			activeKeys: matchedRoutes,
			command: () => {
				navigate(AppRoutes.ALL_PROJECTS);
			}
		},
		{
			key: 'commercials',
			label: 'Commercials',
			icon: <FaMoneyCheckDollar />,
			route: AppRoutes.COMMERCIALS,
			template: menuItemRenderer,
			activeKeys: matchedRoutes,
			items: [
				{
					key: 'payments',
					label: 'Payments',
					route: AppRoutes.COMMERCIALS_PAYMENT,
					icon: <RiMoneyDollarCircleLine />,
					template: menuItemRenderer,
					activeKeys: matchedRoutes,
					command: () => {
						navigate(AppRoutes.COMMERCIALS_PAYMENT);
					}
				}
			]
		},
		{
			key: 'holidays',
			label: 'Holidays',
			route: AppRoutes.HOLIDAYS,
			template: menuItemRenderer,
			icon: <BsCalendarDate />,
			activeKeys: matchedRoutes,
			command: () => {
				navigate(AppRoutes.HOLIDAYS);
			}
		},
		{
			key: 'approvals',
			label: 'Approvals',
			route: AppRoutes.APPROVAL,
			template: menuItemRenderer,
			icon: <BsExclamationCircle />,
			activeKeys: matchedRoutes,
			command: () => {
				navigate(AppRoutes.APPROVAL);
			}
		}
	];

	return (
		<div className="antialiased grow bg-gray-50 dark:bg-gray-900 flex">
			{showSidebar && (
				<NavSidebar
					show={showSidebar}
					menuList={MENU_ITEMS}
					onClose={() => {
						setShowSidebar(false);
					}}
				/>
			)}
			<div className="w-full" aria-expanded="true">
				<GlobalNavbar
					logout={logout}
					isUserLoading={isUserLoading}
					user={user || {}}
					matchedRoutes={matchedRoutes}
					handleMenuIconClick={() => setShowSidebar(prev => !prev)}
				/>
				<div
					className="h-[95vh] p-8 overflow-scroll"
					style={{ background: 'linear-gradient(to bottom, #082f49 30%, transparent 10%)' }}
				>
					{children}
				</div>
			</div>
		</div>
	);
};

export default RootLayout;
