const Promise = require('bluebird')
const path = require(`path`)

exports.createPages = ({graphql, actions})=>{
  const { createPage } = actions

  return new Promise((resolve, reject)=>{
    const blogPost = path.resolve('./src/pages/index.js')
    resolve(
      graphql(
        `
        {
          allContentfulBlogPost{
            edges{
              node{
                title
                slug
                publishDate
                postBody{
                  postBody
                }
                video{
                  title{
                    title
                  }
                  subtitle{
                    subtitle
                  }
                  thumbnailImage{
                    file{
                      url
                    }
                  }
                  embed 
                  originalPostDate
                  length
                }
              }
            }
          }
        }
        `
      ).then(result => {
        if(result.errors){
          console.log(result.errors)
          reject(result.errors)
        }
        const posts=result.data.allContentfulBlogPost.edges
        posts.forEach((post, index) => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug;
      })
    )
  })
}