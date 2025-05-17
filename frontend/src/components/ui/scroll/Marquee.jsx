// ui/scroll/Marquee.jsx
import React, { useRef, useEffect, useState } from "react";

/**
 * Marquee component cho hiệu ứng cuộn mượt mà, chuyên nghiệp
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Nội dung cuộn
 * @param {number} props.speed - Tốc độ cuộn (pixels per second, default: 50)
 * @param {number} props.gap - Khoảng cách giữa các lần lặp lại (px, default: 50)
 * @param {boolean} props.pauseOnHover - Dừng khi hover (default: true)
 */
const Marquee = ({ children, speed = 50, gap = 50, pauseOnHover = true }) => {
  const marqueeRef = useRef(null);
  const [animationDuration, setAnimationDuration] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const calculateDuration = () => {
      const marqueeElement = marqueeRef.current;
      if (marqueeElement) {
        // Tính thời gian animation dựa vào chiều rộng và tốc độ
        const containerWidth = marqueeElement.scrollWidth;
        // Thời gian (giây) = chiều rộng / tốc độ
        const duration = containerWidth / speed;
        setAnimationDuration(duration);
      }
    };

    // Tính lần đầu
    calculateDuration();

    // Tính lại khi thay đổi kích thước cửa sổ
    window.addEventListener('resize', calculateDuration);
    return () => window.removeEventListener('resize', calculateDuration);
  }, [speed, children]);

  const handleMouseEnter = () => pauseOnHover && setIsPaused(true);
  const handleMouseLeave = () => pauseOnHover && setIsPaused(false);

  const marqueeStyle = {
    '--gap': `${gap}px`,
    '--animation-duration': `${animationDuration}s`,
    '--play-state': isPaused ? 'paused' : 'running',
  };

  return (
    <div
      className="marquee-container overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={marqueeStyle}
    >
      <div
        ref={marqueeRef}
        className="marquee-content"
        style={{
          display: 'inline-flex',
          whiteSpace: 'nowrap',
          animation: `marqueeScroll var(--animation-duration) linear infinite`,
          animationPlayState: 'var(--play-state)',
          paddingRight: 'var(--gap)',
        }}
      >
        {children}
        <div style={{ paddingLeft: 'var(--gap)' }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Marquee;