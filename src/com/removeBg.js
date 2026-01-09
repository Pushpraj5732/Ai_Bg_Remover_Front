const formData = new FormData();
const url = import.meta.env.VITE_BACKEND_URL;
formData.append("image", file);
formData.append("clerkUserId", user.id);

fetch(`${url}/api/bg/remove`, {
  method: "POST",
  body: formData
})
  .then(res => res.blob())
  .then(blob => {
    const url = URL.createObjectURL(blob);
    setResultImage(url);
  });
