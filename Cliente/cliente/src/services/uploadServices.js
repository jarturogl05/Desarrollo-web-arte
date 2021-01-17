async function createPost(file, title, tags, description, token) {
  let data = new FormData();
  data.append("image", file[0]);
  data.append("description", description);
  data.append("name", title);
  data.append("workType", "Ilustracion");
  data.append("tags", tags);

  const settings = {
    method: "POST",
    headers: new Headers({
      'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpc1ZhbGlkNjIwIiwiaWF0IjoxNjEwODU4MjY3LCJleHAiOjE2MTA4NTk0Njd9.F9cfc3tWQU3prwsVl2U2UZEGf1gO3THsNWTf4DIvsmI',
    }),

    body: data,
    
  };

  try {
    const response = await fetch("http://localhost:4000/createpost", settings);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

export default createPost;
