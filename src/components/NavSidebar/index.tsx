import { PanelMenu } from 'primereact/panelmenu';
import React, { useEffect, useState } from 'react';
import { getActiveKeys } from './utils';
import { Image } from 'primereact/image';
import Logo from '@assets/images/hk_logo.png';

const NavSidebar = ({ menuList, onClose }: any) => {
	const [expandedKeys, setExpandedKeys] = useState({});

	useEffect(() => {
		const activeKeys = getActiveKeys(menuList);
		setExpandedKeys(activeKeys);
	}, []);

	return (
		<div
			className={`h-screen z-[999] fixed sm:sticky shrink-0 bg-white w-80  transition-[left] duration-500 rounded-sm`}
		>
			<div className="p-6  flex gap-8 items-center h-20 bg-black sticky top-0">
				<img
					className="w-24 ml-48 rounded-md p-6 "
					src={Logo}
					alt="logo"
					style={{ height: '90px', width: '120px' }}
				/>
				{/* <img className="w-[96px] h-[28px] ml-48 rounded-md p-6" src={Logo} alt="logo" /> */}
				{/* <span className="pi pi-times text-2xl sm:!hidden cursor-pointer" onClick={onClose}></span> */}
			</div>
			<div className="h-full flex flex-col px-6 bg-gray-100 pt-[50px]">
				<div className="grow">
					<PanelMenu
						model={menuList}
						expandedKeys={expandedKeys}
						onExpandedKeysChange={setExpandedKeys}
						className="w-full h-full  md:w-20rem"
						pt={{
							root: { className: 'flex flex-col gap-1 bg-white border-0' },
							header: { className: 'cursor-pointer' },
							headerContent: { className: 'bg-white border-0 ' },
							content: { className: 'bg-white' },
							menu: { className: 'flex flex-col ml-6 border-gray-300' },
							menuitem: { className: 'cursor-pointer border-l-[2px]' },
							menuContent: { className: 'border-10 pl-3' }
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default NavSidebar;
