import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
const execAsync = promisify(exec);

export const compilePython = async (pythonCode) => {
  try {
    const escapedCode = pythonCode.replace(/"/g, '\\"');

    const { stdout, stderr } = await execAsync(`python -c "${escapedCode}"`);

    let output;
    if (stderr) {
      output = stderr;
    } else {
      output = stdout;
    }
    console.log(output);
    return output;
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};

export const compileAndRunJava = async (javaCode) => {
  try {
    const javacode = javaCode.replace(/"/g, '\\"');
    const cname = javacode.split(" ")[1].replace(/\W/g, "");

    const compileCommand = `echo "${javacode}" > ${cname}.java && javac ${cname}.java`;
    await execAsync(compileCommand);

    const executeCommand = `java ${cname}`;
    const { stdout, stderr } = await execAsync(executeCommand);

    await execAsync(`rm ${cname}.java ${cname}.class`);

    let output;
    if (stderr) {
      output = stderr;
    } else {
      output = stdout;
    }

    return output;
  } catch (error) {
    throw new Error(error);
  }
};
