import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomeAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [updateSelected, setUpdateSelected] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    testCases: [
      { input: "", expectedOutput: "" },
      { input: "", expectedOutput: "" },
      { input: "", expectedOutput: "" },
    ],
  });

  const [problems, setProblems] = useState();
  const [error, setError] = useState("");

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "title" || name === "description") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      const updatedTestCases = [...formData.testCases];
      updatedTestCases[index][name] = value;
      setFormData({
        ...formData,
        testCases: updatedTestCases,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.reload();
      }
      const response = await axios.post(
        "http://localhost:9000/problems",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setLoading(false);
      console.log(response.statusText);
    } catch (error) {
      if (error.response.data.message === "Token expired") {
        window.location.reload();
      }
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };

  const getProblems = async () => {
    try {
      const response = await axios.get("http://localhost:9000/problems")
      setProblems(response.data.problems);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      setError(error);
    }
  };

  const handelUpdateselect = (p) => {
    setUpdateSelected(true);
    setFormData({ ...p });
  };

  const handleUpdateProblem = async (id) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.put(
        `http://localhost:9000/problems/${id}`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      // Reset formData to its initial state
      setFormData({
        title: "",
        description: "",
        testCases: [
          { input: "", expectedOutput: "" },
          { input: "", expectedOutput: "" },
          { input: "", expectedOutput: "" },
        ],
      });

      setUpdateSelected(false);
      setLoading(false);
      console.log(response);
    } catch (error) {
      if (error.response.data.message === "Token expired") {
        window.location.reload();
      }
      setError(error);
    }
  };

  useEffect(() => {
    getProblems();
  }, [loading]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Admin</h1>
      <Link to="/">Home</Link>

      <div className="flex flex-col">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Title"
          name="title"
          value={formData.title}
          onChange={(e) => handleInputChange(e, 0)}
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={(e) => handleInputChange(e, 0)}
          required
        />
        {formData.testCases.map((testCase, index) => (
          <div key={index}>
            <label htmlFor={`input-${index + 1}`}>{`Test Case ${
              index + 1
            }`}</label>
            <input
              type="text"
              id={`input-${index + 1}`}
              placeholder={`Input ${index + 1}`}
              name="input"
              value={testCase.input}
              onChange={(e) => handleInputChange(e, index)}
              required
            />
            <input
              type="text"
              id={`expected-output-${index + 1}`}
              placeholder={`Expected Output ${index + 1}`}
              name="expectedOutput"
              value={testCase.expectedOutput}
              onChange={(e) => handleInputChange(e, index)}
              required
            />
          </div>
        ))}
        {updateSelected ? (
          <button onClick={() => handleUpdateProblem(formData._id)}>
            Update
          </button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
      {error && <div>Error: {error.message}</div>}
      {problems.map((p) => (
        <div key={p._id}>
          <h1>{p.title}</h1>
          <p>{p.description}</p>
          {p.testCases.map((t, index) => (
            <div key={index}>
              <h2>Input: {t.input}</h2>
              <h2>Expected Output: {t.expectedOutput}</h2>
            </div>
          ))}
          <button onClick={() => handelUpdateselect(p)}>Update</button>
        </div>
      ))}
    </div>
  );
};

export default HomeAdmin;
