import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const {
    data: blog,
    error,
    isPending,
  } = useFetch("https://api-server-agrim.herokuapp.com/blogs/" + id);
  const history = useNavigate();

  const handleClick = () => {
    fetch("https://api-server-agrim.herokuapp.com/blogs/" + blog.id, {
      method: "DELETE",
    }).then(() => {
      history("../", { replace: true });
    });
  };
  const editThis = () => {
    history(`../edit/${id}`, { replace: true });
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <article>
        <h1>{blog.title}</h1>
        <p>Written by {blog.author}</p>
        <div>{blog.body}</div>
        <button onClick={handleClick}>Delete</button>
        <button onClick={editThis}>Edit</button>
      </article>
    </div>
  );
};

export default BlogDetails;
