import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Processing.css";

export default function Processing() {
    const navigate = useNavigate();
    const delay: number = 4000;
    useEffect(() => {
        // 4 Second "Magic" Delay
        const timer = setTimeout(() => {
            // Navigate to the final result page (we'll build this next)
            navigate("/Result");
        }, delay);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="processing-container">
            <div className="spinner-wrapper">
                <div className="magic-spinner"></div>
            </div>

            <h2 className="magic-text">Making Magic...</h2>
            <p className="sub-text">Uploading & Stitching Photos</p>
        </div>
    );
}