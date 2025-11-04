import React, { useContext, useEffect, useRef } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import './Education.css';

function Education() {
    const { theme } = useContext(ThemeContext);
    const sectionRef = useRef(null);
    const hasAnimated = useRef(false);

    const stats = [
        { id: "stat1", end: 77, suffix: "%", text: "Of people experience stress that affects their physical health." },
        { id: "stat2", end: 300, suffix: "B", text: "Is lost annually in productivity due to stress-related illnesses." },
        { id: "stat3", end: 60, suffix: "%", text: "More stress detection with continuous cortisol monitoring." }    ];

    function animateNumber(id, start, end, duration, suffix = "") {
        const el = document.getElementById(id);
        let current = start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / (end - start)));

        const timer = setInterval(() => {
            current += increment;
            el.innerText = current + suffix;
            el.classList.add('pop'); // trigger pop animation
            setTimeout(() => el.classList.remove('pop'), 150);
            if (current === end) clearInterval(timer);
        }, stepTime);
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    stats.forEach(s => animateNumber(s.id, 0, s.end, 2000, s.suffix));
                }
                if (!entries[0].isIntersecting) {
                    hasAnimated.current = false;
                    stats.forEach(s => {
                        const el = document.getElementById(s.id);
                        if (el) el.innerText = "0";
                    });
                }
            },
            { threshold: 0.4 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={sectionRef} className="education" id="resume" style={{ backgroundColor: theme.secondary }}>
            <div className="education-body">

                {/* Heading left-aligned */}
                <div className="education-heading-container">
                    <h1 style={{ color: theme.primary }} className="education-heading">
                        Why is cortisol important?
                    </h1>
                </div>

                {/* Stats centered horizontally */}
                <div className="education-stats">
                    {stats.map(stat => (
                        <div key={stat.id} className="education-stat">
                            <div
                                id={stat.id}
                                className="stat-number"
                                style={{
                                    fontSize: "3.5rem",
                                    fontWeight: "700",
                                    color: theme.primary
                                }}
                            >
                                0
                            </div>
                            <div style={{ color: "#555", fontSize: "1rem", maxWidth: "220px", marginTop: "0.5rem", textAlign: "center" }}>
                                {stat.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Separator line */}
                <hr className="education-separator" />

                {/* New section under stats */}
                <div className="education-info">
                    <h1 style={{ color: theme.primary }} className="education-heading">
                        Microneedles: The Next Generation
                    </h1>
                    <p>
                        Cortisol is essential for managing stress, regulating metabolism, controlling blood sugar and blood pressure, reducing inflammation, and supporting immune responses. It also regulates sleep-wake cycles, heart rate, and prepares the body for a fight-or-flight response. Tracking cortisol can give deep insights into overall health and stress levels, helping companies support employee wellness.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Education;
