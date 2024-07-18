//the tutor made a file called templates inside src 
//I did not make it it came by default
//this blog-post tempalte will be the default template for all our blog posts 
//Note we can name this file blog-post.jsx but for consistency since  all our files are .js we did it .js
//since babel will convert it
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

export default ({data})=>{
    //bcz we know what we are going to pluck off is the markdown
    const post=data.markdownRemark;
    return (
        <Layout>
        <div>
        <h1>{post.frontmatter.title}</h1>
        // dangerouslySetInnerHTML is a special property in React that allows you to inject raw HTML content into a component's output. It is named "dangerously" because it can potentially pose security risks if used carelessly.
        //__ is the value we want 
        <div dangerouslySetInnerHTML={{__html:post.html}}/>
        </div>
        </Layout>
    )
}
//the graphql we need is actual this query
export const query=graphql`
query($slug:String!){
markdownRemark(fields:{slug:{eq:$slug}}){
html
frontmatter{
title
}
}
}
`