"use strict";(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[102],{6406:function(e,t,n){var l=n(7294),o=n(1883);t.Z=e=>{let{posts:t}=e;return l.createElement("ol",{style:{listStyle:"none"}},t.map((e=>{let{node:t}=e;const n=t.frontmatter.title||t.fields.slug,r=t.frontmatter.category||[];return l.createElement("li",{key:t.fields.slug},l.createElement("article",{className:"post-list-item",itemScope:!0,itemType:"http://schema.org/Article"},l.createElement("header",null,l.createElement("small",null,r.join(", ")),l.createElement("h2",null,l.createElement(o.Link,{to:t.fields.slug,itemProp:"url"},l.createElement("span",{itemProp:"headline"},n))),l.createElement("small",null,t.frontmatter.date)),l.createElement("section",null,l.createElement("p",{dangerouslySetInnerHTML:{__html:t.frontmatter.description||t.excerpt},itemProp:"description"}))))})))}},6346:function(e,t){t.Z={height:"40px",padding:"10px 20px",fontSize:"16px",backgroundColor:"#cccccc",color:"#fff",border:"none",borderRadius:"5px",cursor:"pointer",textAlign:"center",textDecoration:"none"}},6978:function(e,t,n){var l=n(7294),o=n(6346);const r=e=>{let{style:t}=e;const{0:n,1:o}=(0,l.useState)(!1);(0,l.useEffect)((()=>{const e=()=>{window.scrollY<document.documentElement.scrollHeight-window.innerHeight-300?o(!0):o(!1)};return window.addEventListener("scroll",e),()=>{window.removeEventListener("scroll",e)}}),[]);return n&&l.createElement("button",{onClick:()=>{window.scrollTo({top:document.documentElement.scrollHeight,behavior:"smooth"})},style:t},"↓")};r.defaultProps={style:o.Z},t.Z=r},7607:function(e,t,n){var l=n(7294),o=n(6346);const r=e=>{let{style:t}=e;const{0:n,1:o}=(0,l.useState)(!1);(0,l.useEffect)((()=>{const e=()=>{window.scrollY>300?o(!0):o(!1)};return window.addEventListener("scroll",e),()=>{window.removeEventListener("scroll",e)}}),[]);return n&&l.createElement("button",{onClick:()=>{window.scrollTo({top:0,behavior:"smooth"})},style:t},"↑")};r.defaultProps={style:o.Z},t.Z=r},7160:function(e,t,n){var l=n(7294),o=n(6346),r=n(7607),c=n(6978);const s={display:"flex",flexDirection:"row",alignItems:"center",position:"fixed",bottom:"20px",right:"20px"};t.Z=()=>l.createElement("div",{style:s},l.createElement(r.Z,{style:o.Z}),l.createElement(c.Z,{style:o.Z}))},6086:function(e,t,n){n.r(t);var l=n(7294),o=n(1883),r=n(8719),c=n(8183),s=n(7160),a=n(6406);t.default=e=>{let{data:t,pageContext:n,location:i}=e;const{category:m}=n,u=t.site.siteMetadata.title,d=t.allMarkdownRemark.edges;return l.createElement(r.Z,{location:i,title:u},l.createElement(c.Z,{title:`Posts in category "${m}"`}),l.createElement(o.Link,{to:`/categories/${m}/`},m),l.createElement(a.Z,{posts:d}),l.createElement(s.Z,null))}}}]);
//# sourceMappingURL=component---src-templates-category-js-2bf113865322ba44e466.js.map