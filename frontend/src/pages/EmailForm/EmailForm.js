import React, { useState } from "react";

const EmailForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("file", file);
    try {
      const response = await fetch("http://localhost:5800/sendEmail", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("email sent successfully");
      } else {
        console.log("errror in sending mail");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <h1>Email Form</h1>
      <form onSubmit={handleSubmit} >
        <div>
          <label>Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>File: </label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EmailForm;
