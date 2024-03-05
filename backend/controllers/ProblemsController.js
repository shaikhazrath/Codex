import mongoose from "mongoose";
import Problem from "../model/problesModel.js"; 

export const createProblem = async (req, res) => {
    try {
        if (!req.isAdmin) {
            return res.status(403).json({ message: 'Forbidden, only admin can create problems' });
          }
        const problem = await Problem.create(req.body);
        res.status(201).json({ problem });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAllProblems = async (req, res) => {
    try {
        const problems = await Problem.find();
        res.status(200).json({ problems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getProblemById = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }
        res.status(200).json({ problem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateProblemById = async (req, res) => {
    try {
        if (!req.isAdmin) {
            return res.status(403).json({ message: 'Forbidden, only admin can create problems' });
          }
        const problem = await Problem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }
        res.status(200).json({ problem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteProblemById = async (req, res) => {
    try {
        if (!req.isAdmin) {
            return res.status(403).json({ message: 'Forbidden, only admin can create problems' });
          }
        const problem = await Problem.findByIdAndDelete(req.params.id);
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }
        res.status(200).json({ message: 'Problem deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
