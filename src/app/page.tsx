
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const mockTasks = [
  { id: 1, title: "Find the One Piece", storyArc: "Main Quest", completed: true },
  { id: 2, title: "Recruit a Swordsman", storyArc: "East Blue", completed: true },
  { id: 3, title: "Defeat Arlong", storyArc: "East Blue", completed: true },
  { id: 4, title: "Enter the Grand Line", storyArc: "Alabasta", completed: false },
  { id: 5, title: "Befriend a Reindeer", storyArc: "Drum Island", completed: false },
];

export default function Home() {
  // Calculate overall progress
  const totalTasks = mockTasks.length;
  const completedTasks = mockTasks.filter(task => task.completed).length;
  const overallProgress = (completedTasks / totalTasks) * 100;

  // Group tasks by story arc
  const tasksByArc = mockTasks.reduce((acc, task) => {
    if (!acc[task.storyArc]) {
      acc[task.storyArc] = [];
    }
    acc[task.storyArc].push(task);
    return acc;
  }, {});

  return (
    <div className="container mx-auto p-4">
      <StoryArcProgressTracker progress={overallProgress} />
      <MangaPanelTaskDisplay tasksByArc={tasksByArc} />
      <CharacterAnalogyGenerator />
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

// Manga-Panel Task Display Component
function MangaPanelTaskDisplay({ tasksByArc }) {
  return (
    <div>
      {Object.entries(tasksByArc).map(([arc, tasks]) => (
        <div key={arc} className="mb-4">
          <h2 className="text-2xl font-bold mb-2">{arc} Arc</h2>
          <div className="flex flex-wrap gap-4">
            {tasks.map(task => (
              <TaskPanel key={task.id} task={task} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Single Task Panel Component
function TaskPanel({ task }) {
  return (
    <Card className="w-64">
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Status: {task.completed ? "Completed" : "Incomplete"}</p>
      </CardContent>
    </Card>
  );
}

function CharacterAnalogyGenerator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Character Analogy Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This feature will use AI to suggest a One Piece character analogy for your avatar.</p>
      </CardContent>
    </Card>
  );
}
