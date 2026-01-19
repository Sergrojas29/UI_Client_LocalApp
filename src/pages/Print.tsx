import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Print.css";

const MOCK_PHOTOS = [
  { id: 1, url: "https://placehold.co/600x900/png?text=Collage", path: "/tmp/collage.jpg" },
  { id: 2, url: "https://placehold.co/600x900/png?text=Photo+1", path: "/tmp/photo1.jpg" },
  { id: 3, url: "https://placehold.co/600x900/png?text=Photo+2", path: "/tmp/photo2.jpg" },
  { id: 4, url: "https://placehold.co/600x900/png?text=Photo+3", path: "/tmp/photo3.jpg" },
];

export default function Print() {
  const navigate = useNavigate();
  const [showPrintConfirm, setShowPrintConfirm] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const [selectedPhotoPath, setSelectedPhotoPath] = useState<string | null>(null);
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  const handlePrintClick = () => setShowPrintConfirm(true);

  const confirmPrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      setShowPrintConfirm(false);
      alert("Sent to Printer!");
    }, 2000);
  };

  const handleDownloadNav = () => navigate("/Download");

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "carousel" ? "grid" : "carousel"));
  };

  const handlePhotoSelect = (path: string, index: number) => {
    setSelectedPhotoPath(path);
    if (viewMode === 'carousel' && galleryRef.current) {
        setActiveDotIndex(index);
        const width = galleryRef.current.clientWidth;
        galleryRef.current.scrollTo({ left: width * index, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (viewMode !== "carousel" || !galleryRef.current) return;
    const container = galleryRef.current;
    const scrollLeft = container.scrollLeft;
    const width = container.clientWidth;
    if (width === 0) return;
    const index = Math.round(scrollLeft / width);
    if (index !== activeDotIndex) setActiveDotIndex(index);
  };

  return (
    <div className="print-page-container">
      
      <div className="print-active-zone">
        
        {/* LEFT: PREVIEW */}
        <section className="print-preview-column">
             <button className="print-view-toggle" onClick={toggleViewMode}>
                {viewMode === "carousel" ? "Grid View" : "Carousel"}
             </button>

             <div 
                className={`print-gallery-window ${viewMode}`} 
                onScroll={handleScroll} 
                ref={galleryRef}
             >
                {MOCK_PHOTOS.map((photo, index) => {
                    const isSelected = selectedPhotoPath === photo.path;
                    return (
                        <div 
                            key={photo.id} 
                            className={`print-gallery-item ${isSelected ? "selected" : ""}`}
                            onClick={() => handlePhotoSelect(photo.path, index)}
                        >
                            <img src={photo.url} alt="Session Photo" />
                            <div className="print-select-overlay">
                                {isSelected && <span className="print-check-badge">✔</span>}
                            </div>
                        </div>
                    );
                })}
             </div>

             {/* Dots */}
             {viewMode === "carousel" && (
                <div className="print-carousel-dots">
                    {MOCK_PHOTOS.map((_, idx) => (
                        <div 
                            key={idx} 
                            className={`print-dot ${idx === activeDotIndex ? "active" : ""}`}
                            onClick={() => handlePhotoSelect(MOCK_PHOTOS[idx].path, idx)}
                        />
                    ))}
                </div>
             )}
        </section>

        {/* RIGHT: SIDEBAR */}
        <section className="print-action-sidebar">
            <div className="print-action-block print-block">
                <div className="print-visual-group">
                    <div className="print-cartoon-placeholder"><span>Cartoon</span></div>
                </div>
                <h3>Keep a Memento</h3>
                <p className="print-sub-text">Print a physical copy.</p>
                <button 
                    className="print-btn-base print-beveled print-primary-btn" 
                    onClick={handlePrintClick}
                    disabled={!selectedPhotoPath} 
                >
                    PRINT
                </button>
            </div>

            <div className="print-action-block" onClick={handleDownloadNav}>
                <div className="print-visual-group">
                    <div className="print-cartoon-placeholder"><span>Cartoon</span></div>
                    <div className="print-social-float">
                        <div className="print-mini-icon print-icon-ig">IG</div>
                        <div className="print-mini-icon print-icon-fb">FB</div>
                        <div className="print-mini-icon print-icon-sc">SC</div>
                    </div>
                </div>
                <h3>Digital Copy</h3>
                <p className="print-sub-text">Post to your favorite social sites!</p>
                <button className="print-btn-base print-beveled print-secondary-btn">
                    GET DIGITAL
                </button>
            </div>
        </section>
      </div>

      {showPrintConfirm && (
        <div className="print-modal-center">
            <h3>Confirm Print?</h3>
            <p>Printing selection...</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem'}}>
                <button onClick={() => setShowPrintConfirm(false)} disabled={isPrinting}>Cancel</button>
                <button onClick={confirmPrint} disabled={isPrinting}>
                    {isPrinting ? "Printing..." : "Confirm"}
                </button>
            </div>
        </div>
      )}
    </div>
  );
}