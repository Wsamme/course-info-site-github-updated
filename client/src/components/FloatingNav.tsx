import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Section {
  id: string;
  title: string;
}

interface FloatingNavProps {
  sections: Section[];
}

export default function FloatingNav({ sections }: FloatingNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full md:w-auto px-4 py-2 bg-primary-foreground text-primary rounded-lg hover:bg-primary-foreground/90 transition-colors"
      >
        <span className="font-medium">Jump to Section</span>
        <ChevronDown
          className={`ml-2 w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 md:right-auto mt-2 bg-white border border-border rounded-lg shadow-lg overflow-hidden md:min-w-[300px] z-50">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="w-full text-left px-4 py-3 text-gray-900 hover:bg-blue-50 transition-colors border-b border-gray-200 last:border-b-0"
            >
              {section.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
