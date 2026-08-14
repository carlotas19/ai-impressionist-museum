import type { Tab } from "@/lib/types";

interface TabNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function TabNav({ activeTab, onTabChange }: TabNavProps) {
  const tabs: { id: Tab; label: string }[] = [
    { id: "gallery", label: "Gallery" },
    { id: "critic", label: "Critic's Verdict" },
    { id: "methodology", label: "Methodology" },
  ];

  return (
    <nav
      className="flex items-center gap-8 border-b border-museum-border"
      aria-label="Museum sections"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative pb-4 font-serif text-base uppercase tracking-[0.2em] transition-colors ${
            activeTab === tab.id
              ? "text-museum-cream"
              : "text-museum-muted hover:text-museum-cream/70"
          }`}
          aria-current={activeTab === tab.id ? "page" : undefined}
        >
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 h-px w-full bg-museum-cream" />
          )}
        </button>
      ))}
    </nav>
  );
}
