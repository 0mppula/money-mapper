import React from 'react';

interface PageContainerProps {
	children: React.ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => {
	return <div className="container max-w-7xl py-8 md:py-12">{children}</div>;
};

export default PageContainer;
