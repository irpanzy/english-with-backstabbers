import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";

interface TopicSelectionProps {
  topics: string[];
  onTopicSelect: (topic: string) => void;
}

export function TopicSelection({ topics, onTopicSelect }: TopicSelectionProps) {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-serif font-bold mb-2">Ready to learn?</h2>
        <p className="text-white/60">
          Choose a topic to start your bite-sized lesson.
        </p>
      </div>

      <div className="grid gap-4">
        {topics.map((topic, idx) => (
          <button
            key={topic}
            onClick={() => onTopicSelect(topic)}
            className="glass-card p-5 flex items-center justify-between group hover:bg-white/10 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-backstabber-red transition-colors">
                <span className="font-mono text-sm font-bold">0{idx + 1}</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">{topic}</h3>
                <p className="text-sm text-white/40">Beginner Level</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}
