import { Skull, ArrowLeft } from "lucide-react";

interface HeaderProps {
  showBackButton: boolean;
  onBackClick: () => void;
  onLogoClick: () => void;
}

export function Header({
  showBackButton,
  onBackClick,
  onLogoClick,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between mb-12">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={onLogoClick}
      >
        <div className="w-10 h-10 bg-backstabber-red rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
          <Skull className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="font-serif text-xl font-bold tracking-tight">
            Backstabbers
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">
            English Learning
          </p>
        </div>
      </div>

      {showBackButton && (
        <button
          onClick={onBackClick}
          className="p-2 hover:bg-white/5 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      )}
    </header>
  );
}
