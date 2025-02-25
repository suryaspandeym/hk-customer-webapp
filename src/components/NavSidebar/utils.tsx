import React from 'react';

import { MenuItem } from 'primereact/menuitem';

export const menuItemRenderer = (item: any, options: any) => {
	const isItemActive = item.activeKeys?.includes(item.route);
	return (
		<a
			href={item.route}
			className={`cursor-pointer flex items-center p-3 hover:bg-secondary  ${
				isItemActive && options.leaf ? 'bg-secondary border-l-2 border-primary' : ''
			}`}
			onClick={options.onClick}
		>
			<div className="flex items-center">
				<span className="text-2xl">{item.icon}</span>
				<span className={`mx-2 text-md ${isItemActive ? 'text-primary font-semibold' : 'text-gray-800'}`}>
					{item.label}
				</span>
			</div>
			{item.items && <span className={`ml-auto pi ${options.active ? 'pi-angle-up' : 'pi-angle-down'}`} />}
		</a>
	);
};

export const getActiveKeys = (items: MenuItem[]) => {
	let keys: any = {};
	items.forEach((item: any) => {
		if (item.items && item.activeKeys?.includes(item.route)) {
			keys[item.key] = true;
			keys = {
				...keys,
				...getActiveKeys(item.items)
			};
		}
	});
	return keys;
};
