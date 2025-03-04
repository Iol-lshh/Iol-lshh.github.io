const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const categoryTemplate = path.resolve(`./src/templates/category.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            category
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error loading blog posts`, result.errors)
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  let categories = []
  posts.forEach(post => {
    if (post.frontmatter.category) {
      categories = categories.concat(post.frontmatter.category)
    }
  })
  categories = [...new Set(categories)]

  console.log(`Creating category pages:`, categories)
  categories.forEach(category => {
    console.log(`Creating category page: /categories/${category}/`)
    createPage({
      path: `/categories/${category}/`,
      component: categoryTemplate,
      context: {
        category,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode, ...rest }, options) => {
  const { createNodeField } = actions

  // 기존 onCreateNode 로직
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  
  // 필요한 경우 페이지 데이터 수정
  deletePage(page)
  createPage({
    ...page,
    context: {
      ...page.context,
      // 사이트맵에 필요한 추가 데이터를 여기에 넣을 수 있음
    },
  })
}

exports.onPostBuild = async ({ graphql, reporter }) => {
  // 사이트맵 생성을 위한 모든 페이지 가져오기
  const result = await graphql(`
    {
      site {
        siteMetadata {
          siteUrl
        }
      }
      allSitePage {
        edges {
          node {
            path
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`사이트맵 생성 중 오류 발생`, result.errors)
    return
  }

  const pages = result.data.allSitePage.edges || []
  reporter.info(`사이트맵 생성을 위한 ${pages.length}개의 페이지가 준비되었습니다.`)
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      instagram: String
      github: String
      linkedin: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
      images: [File] @fileByRelativePath
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      category: [String]
      featuredImage: File @fileByRelativePath
    }

    type Fields {
      slug: String
    }
  `)
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.xml$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "sitemap",
                publicPath: "/sitemap",
                mimetype: "application/xml", // MIME 타입 설정
              },
            },
          ],
        },
      ],
    },
  });
};
