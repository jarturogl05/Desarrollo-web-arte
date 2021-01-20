//const address = 'https://webartuv.herokuapp.com/';
const address = 'http://localhost:4000/';

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
      'Authorization': 'Bearer ' + token,
    }),

    body: data,
    
  };

  try {
    const response = await fetch(address + "createpost", settings);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

export default createPost;
