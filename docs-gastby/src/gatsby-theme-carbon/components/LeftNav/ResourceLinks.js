import React from 'react';
import ResourceLinks from 'gatsby-theme-carbon/src/components/LeftNav/ResourceLinks';

const links = [
  {
    title: 'Github',
    href: 'https://ibm-cloud-architecture.github.io/refarch-kc',
  },
  // {
  //   title: 'Carbon',
  //   href: 'https://www.carbondesignsystem.com',
  // },
  // {
  //   title: 'Configuration guide',
  //   href: '/guides/configuration',
  // },
];

// shouldOpenNewTabs: true if outbound links should open in a new tab
const CustomResources = () => <ResourceLinks shouldOpenNewTabs links={links} />;

export default CustomResources;
