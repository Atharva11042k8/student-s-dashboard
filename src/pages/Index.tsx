import { useState, useEffect } from "react";
import { Header } from "@/components/StudentTracker/Header";
import { TaskCard } from "@/components/StudentTracker/TaskCard";
import { StudyGraph } from "@/components/StudentTracker/StudyGraph";
import { SleepGraph } from "@/components/StudentTracker/SleepGraph";
import { Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Task {
  task: string;
  done: boolean;
}

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [tasks, setTasks] = useState<Record<string, Task[]>>({});
  const [studyData, setStudyData] = useState<Record<string, number>>({});
  const [sleepData, setSleepData] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [tasksRes, studyRes, sleepRes] = await Promise.all([
          fetch('/data/tasks.json'),
          fetch('/data/study.json'),
          fetch('/data/sleep.json'),
        ]);

        if (!tasksRes.ok || !studyRes.ok || !sleepRes.ok) {
          throw new Error('Failed to load data files');
        }

        const [tasksData, studyDataJson, sleepDataJson] = await Promise.all([
          tasksRes.json(),
          studyRes.json(),
          sleepRes.json(),
        ]);

        setTasks(tasksData);
        setStudyData(studyDataJson);
        setSleepData(sleepDataJson);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        toast({
          title: "Error Loading Data",
          description: "Could not load data from JSON files. Please check the console.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Header />

        {/* Date Picker Section */}
        <div className="glass-card rounded-xl p-6">
          <label className="flex items-center gap-3 text-lg font-semibold mb-3">
            <Calendar className="w-5 h-5 text-primary" />
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full md:w-auto px-4 py-3 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        {/* Daily Tasks Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
            <span className="text-primary">✓</span> Daily Tasks
          </h2>
          <TaskCard date={selectedDate} tasks={tasks[selectedDate] || []} />
        </section>

        {/* Graphs Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            <span className="text-primary">📊</span> Performance Analytics
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StudyGraph data={studyData} />
            <SleepGraph data={sleepData} />
          </div>
        </section>

        {/* Instructions */}
        <div className="glass-card rounded-xl p-6 border-l-4 border-primary">
          <h3 className="text-lg font-semibold mb-3 text-primary">
            📝 How to Update Data
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Edit <code className="bg-muted px-2 py-1 rounded">/public/data/tasks.json</code> to add or modify daily tasks</p>
            <p>• Edit <code className="bg-muted px-2 py-1 rounded">/public/data/study.json</code> to update study hours</p>
            <p>• Edit <code className="bg-muted px-2 py-1 rounded">/public/data/sleep.json</code> to update sleep hours</p>
            <p>• Refresh the page to see your changes reflected</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
