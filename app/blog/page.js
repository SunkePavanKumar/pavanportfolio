// @flow strict

import { personalData } from "@/utils/data/personal-data";
import BlogCard from "../components/homepage/blog/blog-card";

async function getBlogs() {
  const query = `
  query Publication($host: String!) {
    publication(host: $host) {
         id
    title
    displayTitle
    descriptionSEO
  	posts(
            first: 10
        ) {
            edges {
                node {
                    title
                    brief
                    url
              			publishedAt
                  	views
                    coverImage {
     						 					url
      									isPortrait
      									attribution
      									photographer
      									isAttributionHidden
    								}
                  readTimeInMinutes
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }
  }
`
  try {
    const variables = { host: "pavansunke.hashnode.dev" };
    const response = await fetch('https://gql.hashnode.com', {
      method: 'POST',
      headers: {
        Authorization: `95a1bd59-ecaf-4437-acb2-9d1993ea1168`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables}),
    });
    const data = await response.json();
    console.log(data.data.publication.posts.edges)
    return data.data.publication.posts.edges;
  } catch (error) {
    console.log("Error :: ", error)
  }

  };

async function page() {
  const blogs = await getBlogs();

  return (
    <div className="py-8">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-2xl rounded-md">
            All Blog
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
        {
          blogs.map((blog, i) => (
            <BlogCard blog={blog.node} key={i} />
          ))
        }
      </div>
    </div>
  );
};

export default page;