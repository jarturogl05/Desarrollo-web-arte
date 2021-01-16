async function createPost(file, title, tags, description) {
  let data = new FormData();
  data.append("image", file[0]);
  data.append("autorId", "5faeebeddd260e0469e46b6c");
  data.append("description", description);
  data.append("name", title);
  data.append("workType", "Ilustracion");
  data.append("tags", tags);

  const settings = {
    method: "POST",
    headers: new Headers({
      // 'Authorization': "Bearer " + this.props.user.token
    }),

    body: data,
    
  };

  try {
    const response = await fetch("http://localhost:4000/createpost", settings);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

export default createPost;
