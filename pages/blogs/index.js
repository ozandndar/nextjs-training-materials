import { useEffect, useState } from "react";

const dummyData = [{
    id: 1,
    title: 'Blog 1',
}, {
    id: 2,
    title: 'Blog 2',
}, {
    id: 3,
    title: 'Blog 3',
}];

const Blog = ({ SSRData }) => {

    const [CSRData, setData] = useState();

    useEffect(() => {
        // fetch data from API
        setData(dummyData);
    }, []);

    return <div>
        <h1>CSR</h1>
        {
            CSRData && CSRData.map(blog => <div key={blog.id}>{blog.title}</div>)
        }
        <hr />
        <h1>SSR</h1>
        {
            SSRData && dummyData.map(blog => <div key={blog.id}>{blog.title}</div>)
        }
    </div>
}

export default Blog;

// to render in the serverside
export function getStaticProps() {
    return {
        props: { SSRData: dummyData }
    }
}