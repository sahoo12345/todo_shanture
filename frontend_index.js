import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await axios.post('/api/tasks', { task });
      const newTask = response.data;
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error('Error adding task', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="/shanture_logo.png" alt="Shanture Logo" className="App-logo" />
        <h1>Shanture To-Do List</h1>
      </header>
      <div className="App-body">
        <AddTaskForm addTask={addTask} />
        <TaskList tasks={tasks} deleteTask={deleteTask} />
        <button onClick={() => window.print()}>Download as PDF</button>
      </div>
    </div>
  );
};

export default App;
