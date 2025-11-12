import { Card } from "@/components/ui/card";
import { useState } from "react";
import { X } from "lucide-react";

interface SimpleSectionProps {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
}

export default function SimpleSection({ id, title, imageSrc, imageAlt }: SimpleSectionProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <div id={id} className="scroll-mt-40 mb-8">
        <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold text-foreground mb-4">{title}</h2>
          <div className="w-full">
            <img 
              src={imageSrc} 
              alt={imageAlt} 
              className="w-full h-auto rounded-lg shadow-sm cursor-pointer hover:opacity-90 transition-opacity" 
              onClick={() => setIsZoomed(true)}
            />
          </div>
        </Card>
      </div>

      {/* Zoomed Image Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={imageSrc} 
            alt={imageAlt} 
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
