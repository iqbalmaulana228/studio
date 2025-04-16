"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { characterAnalogy } from '@/ai/flows/character-analogy';
import { Icons } from '@/components/icons';

// Mock data
const mockTasks = [
  { id: 1, title: "Defeat Kaido", storyArc: "Wano Country", completed: false, priority: "high", dueDate: "Tomorrow" },
  { id: 2, title: "Find Red Poneglyph", storyArc: "Wano Country", completed: false, priority: "medium", dueDate: "3 days" },
  { id: 3, title: "Train Gear 5", storyArc: "Wano Country", completed: false, priority: "low", dueDate: "Ongoing" },
  { id: 4, title: "Free Wano Country", storyArc: "Wano Country", completed: true, priority: "completed", dueDate: "Yesterday" },
];

const mockBounties = [
  { id: 1, name: "Straw Hat Luffy", bounty: "฿1,500,000,000", description: '"Fifth Emperor of the Sea" - Wanted for defeating two Sweet Commanders and declaring war on Big Mom', imageUrl: "https://i.imgur.com/5Z3Wf6T.png" },
  { id: 2, name: "Pirate Hunter Zoro", bounty: "฿320,000,000", description: '"King of Hell" - Wanted for defeating King the Wildfire and numerous other high-ranking Beast Pirates', imageUrl: "https://i.imgur.com/JQ6JQvZ.png" },
  { id: 3, name: "Black Leg Sanji", bounty: "฿177,000,000", description: "Germa 66's Failure - Wanted for defeating Queen the Plague and his raid suit enhancements", imageUrl: "https://i.imgur.com/vV5XqQ7.png" },
];

export default function Home() {
  const [tasks, setTasks] = useState(mockTasks);
  const [bounties, setBounties] = useState(mockBounties);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskStoryArc, setNewTaskStoryArc] = useState("Main Quest");
  const [avatarDescription, setAvatarDescription] = useState("");
  const [characterSuggestion, setCharacterSuggestion] = useState(null);

  // Calculate overall progress
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const overallProgress = (completedTasks / totalTasks) * 100;

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

  const completeTask = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const claimReward = (id) => {
    alert(`Congratulations! You've claimed the bounty! (ID: ${id})`);
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="manga-font text-5xl md:text-6xl text-red-600 mb-2">ONE PIECE QUEST LOG</h1>
          <p className="text-lg text-gray-700">Manage your pirate adventures like the future Pirate King!</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - User Profile and Stats */}
          <div className="lg:col-span-1">
            <div className="manga-panel p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="relative">
                  <img src="https://i.imgur.com/5Z3Wf6T.png" alt="Luffy Avatar" className="w-24 h-24 rounded-full border-4 border-red-500" />
                  <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full w-10 h-10 flex items-center justify-center border-2 border-red-500">
                    <span className="manga-font text-xl">5</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h2 className="manga-font text-2xl">Monkey D. Luffy</h2>
                  <p className="text-gray-600">Captain of the Straw Hat Pirates</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="manga-font">Crew XP</span>
                  <span>1,250/2,000</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '62.5%' }}></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-lg text-center">
                  <div className="manga-font text-blue-800 text-xl">7</div>
                  <div className="text-sm text-blue-600">Active Quests</div>
                </div>
                <div className="bg-green-100 p-3 rounded-lg text-center">
                  <div className="manga-font text-green-800 text-xl">23</div>
                  <div className="text-sm text-green-600">Completed</div>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg text-center">
                  <div className="manga-font text-yellow-800 text-xl">5</div>
                  <div className="text-sm text-yellow-600">Day Streak</div>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg text-center">
                  <div className="manga-font text-purple-800 text-xl">3</div>
                  <div className="text-sm text-purple-600">Bounties</div>
                </div>
              </div>

              <div className="speech-bubble bg-yellow-100 mt-4">
                <p className="manga-font text-lg">"I'm gonna be King of the Pirates! But first I need to complete these quests!"</p>
              </div>
            </div>

            <div className="manga-panel p-6">
              <h3 className="manga-font text-2xl mb-4 text-center border-b-2 border-gray-300 pb-2">Crew Achievements</h3>
              <div className="space-y-3">
                {/* crew achievement 1 */}
                <div key="grand-line" className="flex items-center bg-red-50 p-2 rounded">
                  <div className="bg-red-500 text-white p-2 rounded-full mr-3">
                    <Icons.flag/>
                  </div>
                  <div>
                    <div className="manga-font">Grand Line Explorer</div>
                    <div className="text-xs text-gray-600">Completed 10 quests</div>
                  </div>
                </div>
                {/* crew achievement 2 */}
                <div key="conquerors-haki" className="flex items-center bg-blue-50 p-2 rounded">
                  <div className="bg-blue-500 text-white p-2 rounded-full mr-3">
                    <Icons.flag/>
                  </div>
                  <div>
                    <div className="manga-font">Conqueror's Haki</div>
                    <div className="text-xs text-gray-600">5-day streak</div>
                  </div>
                </div>
                 {/* crew achievement 3 */}
                <div key="straw-hat-captain" className="flex items-center bg-yellow-50 p-2 rounded">
                  <div className="bg-yellow-500 text-white p-2 rounded-full mr-3">
                    <Icons.flag/>
                  </div>
                  <div>
                    <div className="manga-font">Straw Hat Captain</div>
                    <div className="text-xs text-gray-600">Reached Level 5</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Tasks/Quests */}
          <div className="lg:col-span-2">
            <div className="manga-panel p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="manga-font text-3xl">Current Story Arc: Wano Country</h2>
                <button className="bg-red-500 hover:bg-red-600 text-white manga-font px-4 py-2 rounded-lg transition transform hover:scale-105">
                  New Quest <Icons.plus className="ml-1"/>
                </button>
              </div>

              <div className="mb-6">
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  <button className="px-4 py-1 rounded-full bg-red-500 text-white manga-font whitespace-nowrap">All Quests</button>
                  <button className="px-4 py-1 rounded-full bg-gray-200 hover:bg-gray-300 manga-font whitespace-nowrap">Main Story</button>
                  <button className="px-4 py-1 rounded-full bg-gray-200 hover:bg-gray-300 manga-font whitespace-nowrap">Side Quests</button>
                  <button className="px-4 py-1 rounded-full bg-gray-200 hover:bg-gray-300 manga-font whitespace-nowrap">Bounties</button>
                  <button className="px-4 py-1 rounded-full bg-gray-200 hover:bg-gray-300 manga-font whitespace-nowrap">Crew Tasks</button>
                </div>
              </div>

              <div className="space-y-4">
                {/* Quest Items */}
                {tasks.map(task => (
                  <div key={task.id} className={`task-item bg-white p-4 rounded-lg border-l-4 ${task.completed ? 'completed bg-gray-100 border-purple-500' : (task.priority === 'high' ? 'border-red-500' : (task.priority === 'medium' ? 'border-blue-500' : 'border-green-500'))} shadow-md transition duration-200`}>
                    <div className="flex items-start">
                      <button
                        className={`complete-btn mt-1 mr-3 w-6 h-6 rounded-full border-2 ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'} flex items-center justify-center hover:border-green-500`}
                        onClick={() => completeTask(task.id)}
                      >
                        <Icons.check className={`text-white`}/>
                      </button>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="manga-font text-xl">{task.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded manga-font ${task.completed ? 'bg-purple-100 text-purple-800' : (task.priority === 'high' ? 'bg-red-100 text-red-800' : (task.priority === 'medium' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'))}`}>
                            {task.completed ? 'Completed' : task.priority}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">Gather all samurai and prepare for the raid on Onigashima</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Icons.calendar className="mr-1"/>
                          <span className="mr-3">Due: {task.dueDate}</span>
                          {task.priority === 'high' && <Icons.bolt className="mr-1 text-yellow-500"/>}
                          {task.priority === 'medium' && <Icons.bolt className="mr-1 text-blue-500"/>}
                          {task.priority === 'low' && <Icons.bolt className="mr-1 text-green-500"/>}
                          <span>{task.priority} Priority</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="manga-panel p-6">
              <h2 className="manga-font text-3xl mb-4">Crew Bounties</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Bounty Items */}
                {bounties.map(bounty => (
                  <div key={bounty.id} className="bg-white rounded-lg overflow-hidden shadow-md border-2 border-red-500 transform hover:scale-105 transition duration-200">
                    <div className="bg-red-500 p-2 text-white manga-font text-center">BOUNTY: {bounty.bounty}</div>
                    <div className="p-4">
                      <div className="flex items-center mb-3">
                        <img src={bounty.imageUrl} alt={bounty.name} className="w-12 h-12 rounded-full border-2 border-red-500 mr-3" />
                        <div>
                          <h3 className="manga-font text-lg">{bounty.name}</h3>
                          <p className="text-xs text-gray-600">Captain</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{bounty.description}</p>
                      <button
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black manga-font py-1 rounded"
                        onClick={() => claimReward(bounty.id)}
                      >
                        Claim Reward
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
                <CharacterAnalogyGenerator
                    avatarDescription={avatarDescription}
                    setAvatarDescription={setAvatarDescription}
                    generateCharacterAnalogy={generateCharacterAnalogy}
                    characterSuggestion={characterSuggestion}
                />
      </div>
    </div>
  );
}

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
