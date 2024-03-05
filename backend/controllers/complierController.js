import Problem from '../model/problesModel.js';
import {  compileAndRunJava, compilePython } from '../utils/compiler.js';

export const complite = async (req, res) => {
    try {
        const { lang, code } = req.body;

        let output;
        if (lang === 'python') {
            output = await compilePython(code);
        } else if (lang === 'java') {
            output = await compileAndRunJava(code);
        } else {
            return res.json({ output: 'selected lang not supported' }); 
        }
        return res.json({ output }); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error',error });
    }
};


