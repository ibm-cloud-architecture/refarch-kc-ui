import React from 'react';
import Footer from 'gatsby-theme-carbon/src/components/Footer';

const Content = ({ buildTime }) => (
  <>
    {/* <p>
      The <code>Content</code> component receives a <code>buildTime</code> prop
      that to display your site's build time: {buildTime}
    </p> */}
    <p>
      <h4>Contribute:</h4>
    As this implementation solution is part of the Event Driven architeture reference architecture, the contribution policies apply the same way <a href="https://github.com/ibm-cloud-architecture/refarch-kc-ui/blob/master/CONTRIBUTING.md">here</a>.
    </p>
    {/* <p>
      By importing the <strong>Footer</strong> component from
      gatsby-theme-carbon, we can supply our own props.
    </p>
    <p>
      The default export from a shadowed component will replace that component
      in the theme.
    </p> */}
    {/* <p>
      <a href="https://www.gatsbyjs.org/docs/themes/api-reference/#component-shadowing">
        More about component shadowing
      </a>
    </p> */}
  </>
);

const links = {
  firstCol: [
    { linkText: 'Contributors:' },
    { href: 'https://www.linkedin.com/in/jeromeboyer/', linkText: 'Jerome Boyer' },
    { href: 'https://www.linkedin.com/in/hemankita-perabathini/', linkText: 'Hemankita Perabathini' },
  ],
  // secondCol: [
  //   { href: 'https://ibm.com/design', linkText: 'Shadowed link' },
  //   { href: 'https://ibm.com/design', linkText: 'Shadowed link' },
  //   { href: 'https://ibm.com/design', linkText: 'Shadowed link' },
  //   { href: 'https://ibm.com/design', linkText: 'Shadowed link' },
  // ],
};

const CustomFooter = () => <Footer  Content={Content} links={links} />;

export default CustomFooter;
