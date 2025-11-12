import { APP_TITLE } from "@/const";
import SimpleSection from "@/components/SimpleSection";
import FloatingNav from "@/components/FloatingNav";
import { useEffect, useRef } from "react";
import QRCode from "qrcode";

const sections = [
  {
    id: "section1",
    title: "Section 1: What is Innovation & RoadBlocks",
    imageSrc: "/week1.png",
    imageAlt: "Section 1: Understanding Innovation and Identifying Innovation Roadblocks",
  },
  {
    id: "section2",
    title: "Section 2: Actors & IFF Framework",
    imageSrc: "/week2.png",
    imageAlt: "Section 2: Understanding Actors in the Ecosystem and Using the IFF Framework",
  },
  {
    id: "section3",
    title: "Section 3: Driver Mapping & Palette",
    imageSrc: "/week4-5.jpg",
    imageAlt: "Section 3: Driver Mapping and Identify the Palette",
  },
  {
    id: "section4",
    title: "Section 4: Strategic Alignment & Stakeholder Mapping",
    imageSrc: "/week4.png",
    imageAlt: "Section 4: Strategic Alignment Workshop and Stakeholder Mapping",
  },
  {
    id: "section5",
    title: "Section 5: Budget Trade-Off & Innovation Portfolio",
    imageSrc: "/week5.png",
    imageAlt: "Section 5: Budget Trade-Off and Innovation Ambition Matrix",
  },
  {
    id: "section6",
    title: "Section 6: Structure, Funding, Governance & Systems Thinking",
    imageSrc: "/section6.jpg",
    imageAlt: "Section 6: Innovation Structure, Funding Models, Governance, Futures Thinking, Systems Thinking",
  },
  {
    id: "section7",
    title: "Section 7: Innovation Structure & Organizational Culture",
    imageSrc: "/section7.jpg",
    imageAlt: "Section 7: Innovation Structure, Organisational Culture Model, Psychological Safety, Failure Spectrum, Design a Ritual",
  },
  {
    id: "section8",
    title: "Section 8: Portfolio Management & Communication",
    imageSrc: "/section8.jpg",
    imageAlt: "Section 8: Innovation Portfolio Golden Ratio, IPO Model, Performance Measurement, Communicating with Influence",
  },
];

export default function Home() {
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  // Generate QR code for the entire website
  useEffect(() => {
    if (qrCanvasRef.current) {
      const url = window.location.origin + window.location.pathname;
      QRCode.toCanvas(qrCanvasRef.current, url, {
        width: 200,
        margin: 2,
        color: {
          dark: "#1e3a8a",
          light: "#ffffff",
        },
      });
    }
  }, []);

  // Handle hash navigation
  useEffect(() => {
    const scrollToSection = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    scrollToSection();
    window.addEventListener("hashchange", scrollToSection);
    return () => window.removeEventListener("hashchange", scrollToSection);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Navigation */}
      <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="text-xl font-bold">{APP_TITLE}</h1>
          <p className="text-primary-foreground/80 text-sm mt-1">
            Innovation by Design Course Materials - Group1
          </p>
            </div>
            <FloatingNav sections={sections} />
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="container py-8">
        {/* QR Code Section */}
        <div className="mb-8 flex flex-col items-center justify-center bg-card border border-border rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4 text-foreground">Scan to Access This Website</h2>
          <canvas ref={qrCanvasRef} className="border-2 border-border rounded-lg" />
        </div>

        {/* Tree Concept Section */}
        <div className="mb-8 bg-card border border-border rounded-lg p-6 shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <h2 className="text-2xl font-bold text-foreground">Innovation Framework Overview</h2>
            <a
              href="/tree-concept.pdf"
              download="5313-Group1-TreeConcept.pdf"
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </a>
          </div>
          <div className="w-full">
            <img 
              src="/tree-concept.png" 
              alt="Innovation Framework Tree Concept - Complete innovation process map including vision, signals, tools house, and external/internal signals"
              className="w-full h-auto rounded-lg shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => {
                const modal = document.createElement('div');
                modal.className = 'fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4';
                modal.onclick = () => modal.remove();
                const img = document.createElement('img');
                img.src = '/tree-concept.png';
                img.className = 'max-w-full max-h-full object-contain';
                img.onclick = (e) => e.stopPropagation();
                modal.appendChild(img);
                document.body.appendChild(modal);
              }}
            />
          </div>
        </div>

        {/* Course Sections */}
        {sections.map((section) => (
          <SimpleSection
            key={section.id}
            id={section.id}
            title={section.title}
            imageSrc={section.imageSrc}
            imageAlt={section.imageAlt}
          />
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-muted border-t border-border mt-12">
        <div className="container py-6 text-center text-muted-foreground">
          <p className="text-sm">© 2025 {APP_TITLE}. All course materials are for educational purposes only.</p>
        </div>
      </footer>
    </div>
  );
}
