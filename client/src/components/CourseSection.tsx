import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import QRCode from "qrcode";

interface CourseSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function CourseSection({ id, title, children, icon }: CourseSectionProps) {
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (qrCanvasRef.current) {
      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      QRCode.toCanvas(qrCanvasRef.current, url, {
        width: 120,
        margin: 1,
        color: {
          dark: "#1e3a8a",
          light: "#ffffff",
        },
      });
    }
  }, [id]);

  return (
    <div id={id} className="scroll-mt-20">
      <Card className="p-6 mb-6 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              {icon && <div className="text-primary">{icon}</div>}
              <h2 className="text-2xl font-bold text-foreground">{title}</h2>
            </div>
            <div className="text-foreground">{children}</div>
          </div>
          <div className="flex flex-col items-center justify-start gap-2 lg:min-w-[140px]">
            <canvas ref={qrCanvasRef} className="border-2 border-border rounded-lg" />
            <p className="text-xs text-muted-foreground text-center">Scan to view this section</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
