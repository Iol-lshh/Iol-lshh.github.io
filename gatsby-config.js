require("dotenv").config({ path: "./.private.env" });

module.exports = {
  siteMetadata: {
    title: `Iol-lshh's`,
    author: {
      name: `Iol-lshh`,
      summary: `The Engineer, Aiming Fine.`,
    },
    description: `Iol-lshh의 블로그`,
    siteUrl: `https://iol-lshh.github.io/`,
    social: {
      instagram: `l__sh.h`,
      github: `Iol-lshh`,
      linkedin: `in/성혁-홍-06372b214`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-categories`,
      options: {
        templatePath: `${__dirname}/src/templates/category.js`,
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
              linkImagesToOriginal: false,
              showCaptions: true,
              markdownCaptions: true,
              withWebp: true,
              withAvif: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          "gatsby-remark-gifs",
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `{
              allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                nodes {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }`,
            output: "/rss.xml",
            title: "Iol-lshh's Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Iol-lshh's Blog`,
        short_name: `Iol-lshh's`,
        start_url: `/`,
        background_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [process.env.GA_PROPERTY_ID], // GA4 측정 ID로 변경
        gtagConfig: {
          anonymize_ip: true, // 사용자 IP 익명화 (GDPR 대비)
        },
        pluginConfig: {
          head: true, // head에 삽입하여 로드 속도 최적화
        },
      },
    },
  ],
}