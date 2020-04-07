module.exports = {
  siteMetadata: {
    title: 'User Interface for the K-Container shipment solution',
    description: 'User Interface for the K-Container shipment solution',
    keywords: 'gatsby,theme,carbon',
    repository: {
      baseUrl: 'https://github.com/ibm-cloud-architecture/refarch-kc-ui',
      subDirectory: '/docs-gatsby',
      branch: 'master'
    }
  },
  pathPrefix: "/refarch-kc-ui",
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Carbon Design Gatsby Theme',
        short_name: 'Gatsby Theme Carbon',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#0062ff',
        display: 'browser',
      },
    },
    {
      resolve: 'gatsby-theme-carbon',
      options: {
        isSearchEnabled: true,
        titleType: 'append'
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-149377589-3"
      }
    }
  ],
};
