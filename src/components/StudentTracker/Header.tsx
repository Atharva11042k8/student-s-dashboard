import headerImage from "@/assets/pixel-header.jpg";

export const Header = () => {
  return (
    <header className="w-full mb-8">
      <div className="relative w-full h-48 md:h-64 rounded-2xl overflow-hidden glass-card">
        <img 
          src={headerImage} 
          alt="Student Tracker Header" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-6 md:p-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold neon-text mb-2">
              Ultimate Student Tracker
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Track your study hours, sleep schedule, and daily tasks
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
