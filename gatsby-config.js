if (process.env.NODE_ENV == 'development') {
  require('dotenv').config()
}
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
              linkImagesToOriginal: true,
              showCaptions: true,
              markdownCaptions: true,
              withWebp: true,
              withAvif: true,
              quality: 90,
              backgroundColor: 'white',
              disableBgImageOnAlpha: true,
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
                // frontmatter.image가 있으면 그걸 사용, 없으면 본문에서 첫 번째 이미지 사용
                let imagePath = node.frontmatter.image;
                if (!imagePath) {
                  const firstImgMatch = node.html.match(/<img[^>]+src=\"([^\"]+)\"/);
                  if (firstImgMatch && firstImgMatch[1]) {
                    imagePath = firstImgMatch[1];
                  } else {
                    imagePath = null; // 이미지가 아예 없으면 null
                  }
                }
                const enclosure = imagePath ? {
                  url: imagePath.startsWith('http') ? imagePath : site.siteMetadata.siteUrl + imagePath,
                  type: 'image/jpeg',
                  size: 0
                } : null;

                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  enclosure: enclosure,
                  custom_elements: [
                    { "content:encoded": node.html }
                  ]
                });
              });
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
            description: "Iol-lshh의 기술 블로그 RSS 피드",
            feed_url: "https://iol-lshh.github.io/rss.xml",
            site_url: "https://iol-lshh.github.io",
            image_url: "https://iol-lshh.github.io/icon.png",
            managingEditor: "Iol-lshh",
            webMaster: "Iol-lshh",
            copyright: "2025 Iol-lshh",
            language: "ko",
            categories: ["Technology", "Programming", "Software Engineering"],
            pubDate: new Date().toUTCString(),
            ttl: 60,

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
        icon: `src/images/icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: '/',
        createLinkInHead: true,
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
            allMarkdownRemark {
              nodes {
                fields {
                  slug
                }
                frontmatter {
                  date
                }
              }
            }
          }
        `,
        resolveSiteUrl: ({site}) => site?.siteMetadata?.siteUrl || 'https://iol-lshh.github.io',
        resolvePages: ({ allSitePage, allMarkdownRemark }) => {
          const mdPathMap = {};
          
          allMarkdownRemark.nodes.forEach(node => {
            if (node.fields && node.fields.slug) {
              mdPathMap[node.fields.slug] = node.frontmatter.date;
            }
          });
          
          return allSitePage.nodes.map(page => {
            const dateValue = mdPathMap[page.path];
            
            return {
              ...page,
              lastmod: dateValue || null
            };
          });
        },
        serialize: ({ path, lastmod, site }) => {
          const baseUrl = 'https://iol-lshh.github.io';
          const entry = {
            url: baseUrl + path,
            changefreq: `weekly`,
            priority: path === '/' ? 1.0 : 0.7
          };
          
          if (lastmod) {
            entry.lastmod = lastmod;
          }
          
          return entry;
        }
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://iol-lshh.github.io',
        sitemap: 'https://iol-lshh.github.io/sitemap-index.xml',
        policy: [
          { 
            userAgent: '*', 
            allow: '/',
            disallow: ['/404/', '/404.html']
          }
        ]
      }
    },
    ...(process.env.GA_PROPERTY_ID ? [{
  resolve: `gatsby-plugin-google-gtag`,
  options: {
    trackingIds: [process.env.GA_PROPERTY_ID],
    gtagConfig: {
      anonymize_ip: true,
    },
    pluginConfig: {
      head: true,
    },
  },
}] : []),
  ],
}
