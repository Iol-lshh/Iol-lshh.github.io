const React = require("react")

/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: `kr` })
  setHeadComponents([
    <meta
      key="google-site-verification"
      name="google-site-verification"
      content="LEo1xOpJzzFOmdUP87JG6WS6yz0DY9eO0Eh8tfT29CU"
    />,
  ])
}
