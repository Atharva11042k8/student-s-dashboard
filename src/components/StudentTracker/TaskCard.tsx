import { CheckCircle2, Circle } from "lucide-react";

interface Task {
  task: string;
  done: boolean;
}

interface TaskCardProps {
  date: string;
  tasks: Task[];
}

export const TaskCard = ({ date, tasks }: TaskCardProps) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="glass-card rounded-xl p-6 text-center">
        <p className="text-muted-foreground">No tasks added for this day.</p>
      </div>
    );
  }

  const completedCount = tasks.filter(t => t.done).length;
  const completionRate = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="glass-card rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Tasks for {date}</h3>
        <span className="text-sm text-muted-foreground">
          {completedCount}/{tasks.length} completed
        </span>
      </div>
      
      <div className="w-full bg-muted rounded-full h-2 mb-4">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-500"
          style={{ width: `${completionRate}%` }}
        />
      </div>

      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div 
            key={index}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 group"
          >
            {task.done ? (
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            )}
            <span className={`text-sm md:text-base ${task.done ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
              {task.task}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
