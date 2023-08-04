import React from 'react';

interface PageContainerProps {
	children: React.ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => {
	return <div className="container max-w-5xl pt-8 md:pt-12">{children}</div>;
};

export default PageContainer;
