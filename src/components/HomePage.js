import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
  const {
    data: blogs,
    isPending,
    error,
  } = useFetch("https://api-server-agrim.herokuapp.com/blogs");

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      <BlogList blogs={blogs} title="All Blogs" />
    </div>
  );
};

export default Home;
