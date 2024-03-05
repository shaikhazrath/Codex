import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const [problems, setProblems] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getProblems = async () => {
    try {
      const response = await axios.get("http://localhost:9000/problems");
      setProblems(response.data.problems);
      setLoading(false);
    } catch (error) {
      setLoading(false);

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
      {problems.map((p) => (
        <div key={p._id}>
          <Link to={`/editor/${p._id}`}>
            <h1>{p.title}</h1>
          </Link>
        </div>
      ))}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};

export default Home;
