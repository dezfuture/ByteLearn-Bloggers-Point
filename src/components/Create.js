import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [isPending, setIsPending] = useState(false);
  const history = useNavigate();
  const takemeBack = (e) => {
    e.preventDefault();
    history("../", { replace: true });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    setIsPending(true);

    fetch("https://api-server-agrim.herokuapp.com/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      setIsPending(false);
      history("../", { replace: true });
    });
  };

  return (
    <div className="create">
      <h1>Add a New Blog</h1>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Content</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <label>Author</label>
        <input
          type="text"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        {!isPending && <button>Submit</button>}
        {!isPending && <button onSubmit={takemeBack}> Cancel</button>}
        {isPending && <button disabled>Adding a Blog</button>}
      </form>
    </div>
  );
};

export default Create;
