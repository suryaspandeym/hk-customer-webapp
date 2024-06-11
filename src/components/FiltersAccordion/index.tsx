import React from "react";

import { Accordion, AccordionTab } from "primereact/accordion";
import { Card } from "primereact/card";

interface FiltersAccordionProps {
	header: React.ReactNode;
	children: React.ReactNode;
}

const FiltersAccordion: React.FC<FiltersAccordionProps> = ({ header, children }) => {
	return (
		<>
			<Accordion activeIndex={0} className="md:hidden">
				<AccordionTab headerTemplate={header}>{children}</AccordionTab>
			</Accordion>
			<Card className="hidden md:block">
				{header}
				{children}
			</Card>
		</>
	);
};

export default FiltersAccordion;
