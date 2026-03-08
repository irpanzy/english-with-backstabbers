export default function Footer() {
  return (
    <footer className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/20 font-bold">
      <span>v1.0.0</span>
      <span>English With Backstabbers</span>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  );
}
