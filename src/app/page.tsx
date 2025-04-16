"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { characterAnalogy } from '@/ai/flows/character-analogy';

// Mock data for tasks
const mockTasks = [
  { id: 1, title: "Find the One Piece", storyArc: "Main Quest", completed: true },
  { id: 2, title: "Recruit a Swordsman", storyArc: "East Blue", completed: true },
  { id: 3, title: "Defeat Arlong", storyArc: "East Blue", completed: true },
  { id: 4, title: "Enter the Grand Line", storyArc: "Alabasta", completed: false },
  { id: 5, title: "Befriend a Reindeer", storyArc: "Drum Island", completed: false },
];

export default function Home() {
  const [tasks, setTasks] = useState(mockTasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskStoryArc, setNewTaskStoryArc] = useState("Main Quest");
  const [avatarDescription, setAvatarDescription] = useState("");
  const [characterSuggestion, setCharacterSuggestion] = useState(null);

  // Calculate overall progress
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const overallProgress = (completedTasks / totalTasks) * 100;

  // Group tasks by story arc
  const tasksByArc = tasks.reduce((acc, task) => {
    if (!acc[task.storyArc]) {
      acc[task.storyArc] = [];
    }
    acc[task.storyArc].push(task);
    return acc;
  }, {});

  // Handlers for task operations
  const addTask = () => {
    if (newTaskTitle.trim() === "") return;
    const newTask = {
      id: tasks.length + 1,
      title: newTaskTitle,
      storyArc: newTaskStoryArc,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const generateCharacterAnalogy = async () => {
    try {
      const analogy = await characterAnalogy({ avatarDescription });
      setCharacterSuggestion(analogy);
    } catch (error) {
      console.error("Failed to generate character analogy:", error);
      alert("Failed to generate character analogy. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <StoryArcProgressTracker progress={overallProgress} />
      <TaskInputPanel
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        newTaskStoryArc={newTaskStoryArc}
        setNewTaskStoryArc={setNewTaskStoryArc}
        addTask={addTask}
      />
      <MangaPanelTaskDisplay
        tasksByArc={tasksByArc}
        toggleTaskCompletion={toggleTaskCompletion}
        deleteTask={deleteTask}
      />
      <CharacterAnalogyGenerator
        avatarDescription={avatarDescription}
        setAvatarDescription={setAvatarDescription}
        generateCharacterAnalogy={generateCharacterAnalogy}
        characterSuggestion={characterSuggestion}
      />
    </div>
  );
}

// Story Arc Progress Tracker Component
function StoryArcProgressTracker({ progress }) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Story Arc Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={progress} />
        <p className="text-sm mt-2">Overall Progress: {progress.toFixed(2)}%</p>
      </CardContent>
    </Card>
  );
}

// Task Input Panel Component
function TaskInputPanel({
  newTaskTitle,
  setNewTaskTitle,
  newTaskStoryArc,
  setNewTaskStoryArc,
  addTask,
}) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Add New Quest</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Quest Title"
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Story Arc"
          value={newTaskStoryArc}
          onChange={e => setNewTaskStoryArc(e.target.value)}
        />
        <Button onClick={addTask}>Add Quest</Button>
      </CardContent>
    </Card>
  );
}

// Manga-Panel Task Display Component
function MangaPanelTaskDisplay({ tasksByArc, toggleTaskCompletion, deleteTask }) {
  return (
    <div>
      {Object.entries(tasksByArc).map(([arc, tasks]) => (
        <div key={arc} className="mb-4">
          <h2 className="text-2xl font-bold mb-2">{arc} Arc</h2>
          <div className="flex flex-wrap gap-4">
            {tasks.map(task => (
              <TaskPanel
                key={task.id}
                task={task}
                toggleTaskCompletion={toggleTaskCompletion}
                deleteTask={deleteTask}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Single Task Panel Component
function TaskPanel({ task, toggleTaskCompletion, deleteTask }) {
  return (
    <Card className="w-64">
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Status: {task.completed ? "Completed" : "Incomplete"}</p>
        <Button onClick={() => toggleTaskCompletion(task.id)}>
          {task.completed ? "Mark Incomplete" : "Mark Complete"}
        </Button>
        <Button variant="destructive" onClick={() => deleteTask(task.id)}>
          Delete
        </Button>
      </CardContent>
    </Card>
  );
}

// Character Analogy Generator Component
function CharacterAnalogyGenerator({ avatarDescription, setAvatarDescription, generateCharacterAnalogy, characterSuggestion }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Character Analogy Generator</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Textarea
          placeholder="Describe your avatar"
          value={avatarDescription}
          onChange={e => setAvatarDescription(e.target.value)}
        />
        <Button onClick={generateCharacterAnalogy}>Suggest Character</Button>
        {characterSuggestion && (
          <div className="mt-4">
            <h3>Suggested Character: {characterSuggestion.suggestedCharacter}</h3>
            <p>Reasoning: {characterSuggestion.reasoning}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
