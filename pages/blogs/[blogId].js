const SingleBlog = ({ data }) => {
    return <div>
        <h1>{data.title}</h1>
    </div>
}

export default SingleBlog;

// generates html pages in the build folder
export async function getStaticPaths() {
    const result = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
    const allBlogs = await result.json();

    const paths = allBlogs.map((blog) => ({
        params: {
            blogId: blog.id.toString()
        }
    }));

    return {
        paths: paths,
        fallback: 'blocking',
    }
}

// creates context of the pages
export async function getStaticProps(context) {
    const { blogId } = context.params;

    const result = await fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`);
    const singleBlog = await result.json();

    if (Object.keys(singleBlog).length > 0) {
        return {
            props: {
                data: singleBlog
            },
            revalidate: 1
        }
    }

    return {
        notFound: true,
    }
}
