import axios from "axios";



const CreatePost = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here

    const formData = new FormData(e.target);

    axios.post("http://localhost:3000/create-post", formData)
      .then((res) => {
      console.log(res)
      })
    .catch((err) => {
      console.error(err)
      alert("Error creating post")
    });
  }

  return (
    <section className="create-post-section">
      <h1>Create New Post</h1>

      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="file-upload">
          <label htmlFor="image">Upload Image</label>
          <input type="file" id="image" name="image" accept="image/*" />
        </div>

        
        <input
          type="text"
          placeholder="Entre caption"
          name="caption"
          required
        />
        <button type="submit">Create Post</button>
      </form>
    </section>
  );
}

export default CreatePost
