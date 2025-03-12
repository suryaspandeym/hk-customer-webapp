import { navigateToExternalLink } from '@utilities';
import AppRoutes from '@utilities/app-routes';
import { Image } from 'primereact/image';
import { Menu } from 'primereact/menu';
import React, { useRef } from 'react';
import Logo from '@assets/images/hk_logo.png';

const UserDetails = ({ userName, userEmail, userPhoneNumber }: any) => (
	<div className=" flex gap-3 flex-col">
		<div className=" flex gap-3">
			<i className="pi pi-user text-primary"></i> {userName}
		</div>
		<div className=" flex gap-3">
			<i className="pi pi-envelope text-primary"></i> {userEmail}
		</div>
		<div className=" flex gap-3">
			<i className="pi pi-phone text-primary"></i> {userPhoneNumber}
		</div>
	</div>
);

const GlobalNavbar = ({ isUserLoading, user = {}, logout, handleMenuIconClick }: any) => {
	const menu: any = useRef(null);

	const dropdownItems = [
		{
			label: <UserDetails userName={user?.fullName} userEmail={user.email} userPhoneNumber={user.phoneNumber} />,
			command: () => navigateToExternalLink(AppRoutes.PROFILE)
		},
		{
			label: 'Organization',
			icon: 'pi pi-users',
			command: () => navigateToExternalLink(AppRoutes.ORGANIZATION)
		},
		{
			label: 'Logout',
			icon: 'pi pi-fw pi-power-off',
			command: logout
		}
	];

	return (
		<div className="h-20 sticky top-0 z-50 shadow-sm shadow-gray-300 w-full bg-black">
			<div className="flex py-2 h-full items-center ">
				<div className="text-2xl pl-8 w-72 flex gap-4">
					{/* <span
						className="pi pi-bars text-2xl text-white cursor-pointer"
						onClick={handleMenuIconClick}
					></span> */}
				</div>
				<div className="pr-8 flex grow items-center">
					<div className="ml-auto">
						<div className="sm:flex gap-10 items-center hidden">
							{!!user.profilePicture ? (
								<Image
									src={!isUserLoading ? user?.profilePicture?.documentUrl : ''}
									onClick={event => menu.current.toggle(event)}
									pt={{
										root: {
											className:
												'rounded-full overflow-hidden h-[3rem] w-[3rem] cursor-pointer bg-gray-300'
										},
										image: { className: 'h-12 w-12' }
									}}
								/>
							) : (
								<div
									className="flex items-center p-2 justify-center rounded-full cursor-pointer bg-gray-300"
									onClick={event => menu.current.toggle(event)}
								>
									<i className="pi pi-user text-3xl"></i>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<Menu
				ref={menu}
				popup
				model={dropdownItems}
				pt={{
					root: {
						className: 'text-white w-max p-0'
					},
					separator: { className: 'm-0' }
				}}
			/>
		</div>
	);
};

export default GlobalNavbar;
