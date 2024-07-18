//he deleted this code
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
  * @type {import('gatsby').GatsbyNode['createPages']}
 */

// exports.createPages = async ({ actions }) => {
//   const { createPage } = actions
//   createPage({
//     path: "/using-dsg",
//     component: require.resolve("./src/templates/using-dsg.js"),
//     context: {},
//     defer: true,
//   })
// }
//taking the file path
//Note gatsby prefers backtecks when istianciating a string
//this is one of the rules of gatsby we can find the rules in .prettierrc file
//.prettierrc is a tool allows us to consistently enforce certain type things and styling,regarding the way we write
//the code
//.prettierrc is very good if we have an app with many developers that have diff ways that they like to
//write things with .prettierrc
const { graphql} = require('gatsby')
const path=require('path');
const {createFilePath}=require(`gatsby-source-filesystem`)
//Note as in graphql query every file has a node which is the representation of the file

exports.onCreateNode=({node,actions})=>{
  const{createNodeField}=actions
  //this ndoe.internal gives us the node we want the type
  if(node.internal.type===`MarkdownRemark`){
    //we are going to make a slag a slug is url or link that can be accessed from our app
    //to navigate to the page required
    //we want the slug to be dynamic we want to attach it as a field to the node
    //so when we are passing to link we are always passing to the correct 
    //so we want to to build the path dynamically
    //this createFilePath takes an obj a parameter
    //we need to pass the method getNode which is in API docs
    //getNode is a fn that allows us to pullthe actual node representation of the file
    //3rd param is optional which is the basePath
    //it is something that we pass when want to pass the basePath to the url in our case we do not 
    //need it
    const slug=createFilePath({node,getNode,basePath: `pages`})

    //creating node field in our file 
    createNodeField({
      //this node points to the node
      node,
      //this name is the name of the property we want to add
      name:`slug`,
      value:slug
    })
  }
}

//createpage method takes 2 args that we want the structure off 
//1st one is graphql
exports.createPages=({graphql,actions})=>{
  //we want to destructure createPage
  //createPage is an action that allow  us to actually build pages inside of our app based on whatever
  //properties we pass to it 
  const{createPage}=actions;
  //from this fn we want to return a graphql query that gives us back all of our markdown remarks
  //to use graphql we should return this
  //Note this syntax is before ES6
  //return graphql(``)
  //with ES6 but they are the same
  //here we are passing literal string template
  //but bcz with node we do not get ES6 syntax 
  //return graphql``
  //we added this sort to the query for sorting
  //we added fields to this query to add links to our pages from components
  return graphql(`
     {
      allMarkdownRemark(sort:{fields:[frontmatter___date,order:DESC
      ]}) {
      totalCount
        edges {
          node {
          id
          frontmatter{
          description 
          title 
          date
          }
            fields {
              slug
            }
          }
        }
      }
    }

    `).then(result=>{
      result.data.allMarkdownRemark.edges.forEach(({node})=>{
        createPage({
          //the path will tell it what actual the path of the page I am building 
          path:node.fields.slug,
          //Note component is going to be the template that it uses to populate the final blogpost
          component:path.resolve(`./src/templates/blog-post.js`),
          //to pass the slug value to the query in blog-post.js we pass it to this context obj
          context:{
            slug:node.fields.slug
          }

        })
      })
    })
}
