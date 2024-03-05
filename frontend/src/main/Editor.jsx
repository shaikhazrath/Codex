import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Editorx = () => {
  const { id } = useParams();

  const editorRef = useRef(null);
  const [output, setOutput] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [statercode,setStatercode] = useState()
  const [problem, setProblem] = useState();
  const [loading, setLoading] = useState(true);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }
  const getProblem = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/problems/${id}`);
      setProblem(response.data.problem);
      setStatercode(`def ${response.data.problem.title}():
      `)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const getEditorValue = async () => {
    try {
      if (!editorRef.current) {
        console.error("Editor is not mounted.");
        return;
      }

      let code = editorRef.current.getValue();
      const response = await axios.post("http://localhost:9000/compiler", {
        code,
        lang: selectedLanguage,
      });
      setOutput(response.data.output);
    } catch (error) {
      
      console.error("Error occurred while sending data:", error);
    }
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);

  };

  useEffect(() => {
    getProblem();
  });

  if (loading) {
    return <h1>loading.....</h1>;
  }
  return (
    <div className="">
      <div className="flex justify-center">
        <button onClick={getEditorValue}>Run</button>
        <select value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
      </div>
      <div className="flex flex-row">
        <div className="w-[50%]">
          <Editor
            height="100vh"
            width="100%"
            theme="vs-dark"
            defaultLanguage={selectedLanguage}
            onMount={handleEditorDidMount}
            value={statercode}
          />
        </div>
        <div className="w-[50%] h-screen">
          {output && <p className=" text-2xl font-bold">{output}</p>}
          <h1>{problem.title}</h1>
          <h1>{problem.description}</h1>
        </div>
      </div>
    </div>
  );
};

export default Editorx;
