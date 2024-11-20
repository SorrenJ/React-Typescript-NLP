import React, { useEffect, useState } from 'react';
import './projects.css';

interface SegmentData {
  text: string;
  iconClass: string;
  listId: string;
}

const segmentsData: Record<string, SegmentData> = {
  segment1: { text: 'UX Design', iconClass: 'fa-brands fa-figma', listId: 'list1' },
  segment2: { text: 'AI/ML', iconClass: 'fa-robot', listId: 'list2' },
  segment3: { text: 'Sorren', iconClass: 'fa-user', listId: 'list3' },
  segment4: { text: 'Full-Stack', iconClass: 'fa-laptop-code', listId: 'list4' },
};

const Projects: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<SegmentData | null>({ text: 'Hover', iconClass: '', listId: '' });
  const [activeList, setActiveList] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [centerText, setCenterText] = useState<string>('Hover');
  const [centerIconClass, setCenterIconClass] = useState<string | null>(null);
  const [opacityState, setOpacityState] = useState<Record<string, number>>({
    startScreen: 1,
    segments: 0,
  });

  const startGame = () => {
    setGameStarted(true);
    setOpacityState((prev) => ({
      ...prev,
      startScreen: 0,
      segments: 1,
    }));
  };

  const handleMouseOver = (text: string, iconClass: string | null) => {
    setCenterText(text);
    setCenterIconClass(iconClass);
  };

  const resetCenterText = () => {
    if (selectedSegment) {
      setCenterText(selectedSegment.text);
      setCenterIconClass(selectedSegment.iconClass);
    }
  };

  const selectSegment = (segmentId: string) => {
    const segment = segmentsData[segmentId];
    setSelectedSegment(segment);
    setActiveList(segment.listId);
  };

  useEffect(() => {
    // Hide start screen after fade-out transition
    if (opacityState.startScreen === 0) {
      setTimeout(() => {
        const startScreen = document.getElementById('startScreen');
        if (startScreen) startScreen.style.display = 'none';
      }, 1000); // Adjust delay to match CSS transition duration
    }
  }, [opacityState.startScreen]);

  return (
    <div>
      {!gameStarted ? (
        <div id="startScreen" onClick={startGame} style={{ opacity: opacityState.startScreen, transition: 'opacity 1s ease' }}>
          <h1>Sorren's Portfolio</h1>
          <canvas id="treeCanvas" width={800} height={400}></canvas>
          <p>Click Anywhere to Start</p>
        </div>
      ) : (
        <div id="segmentListContainer">
          <div id="selectorScreen" style={{ position: 'relative', width: '500px', height: '500px', opacity: opacityState.segments, transition: 'opacity 2s ease' }}>
            <svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
              {Object.keys(segmentsData).map((segmentId, index) => (
                <path
                  key={segmentId}
                  id={segmentId}
                  className="segment"
                  onMouseOver={() => handleMouseOver(segmentsData[segmentId].text, segmentsData[segmentId].iconClass)}
                  onMouseOut={resetCenterText}
                  onClick={() => selectSegment(segmentId)}
                  d={
                    segmentId === 'segment1'
                      ? 'M250,70 A180,180 0 0,1 420,250 L380,250 A140,140 0 0,0 250,110 Z'
                      : segmentId === 'segment2'
                      ? 'M420,250 A180,180 0 0,1 250,420 L250,380 A140,140 0 0,0 380,250 Z'
                      : segmentId === 'segment3'
                      ? 'M250,420 A180,180 0 0,1 80,250 L120,250 A140,140 0 0,0 250,380 Z'
                      : 'M80,250 A180,180 0 0,1 250,70 L250,110 A140,140 0 0,0 120,250 Z'
                  }
                  fill="#ffffff"
                />
              ))}
            </svg>
            <div
              id="centerTextOverlay"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                fontSize: '1.5em',
                opacity: opacityState.segments,
                transition: 'opacity 0.5s ease-in-out',
              }}
            >
              {centerIconClass ? <i className={`fa ${centerIconClass}`}></i> : <p>{centerText}</p>}
            </div>
          </div>

          <div id="listContainer" style={{ opacity: opacityState.segments, transition: 'opacity 0.5s ease' }}>
            {Object.keys(segmentsData).map((segmentId) => (
              <div key={segmentId} id={segmentsData[segmentId].listId} className={`elements-list ${activeList === segmentsData[segmentId].listId ? 'active' : ''}`}>
                {segmentsData[segmentId].listId === 'list1' && (
                  <>
                    <h1>UX Design</h1>
                    <ul>
                      <li className="list-item" style={{ opacity: activeList === 'list1' ? 1 : 0, transition: 'opacity 0.5s ease' }}>Travel App Figma Prototype</li>
                      <li className="list-item" style={{ opacity: activeList === 'list1' ? 1 : 0, transition: 'opacity 0.5s ease' }}>Bakery Website Redesign</li>
                      <li className="list-item" style={{ opacity: activeList === 'list1' ? 1 : 0, transition: 'opacity 0.5s ease' }}>Smart Drive Website</li>
                    </ul>
                  </>
                )}
                {segmentsData[segmentId].listId === 'list2' && (
                  <>
                    <h1>AI/ML</h1>
                    <ul>
                      <li className="list-item" style={{ opacity: activeList === 'list2' ? 1 : 0, transition: 'opacity 0.5s ease' }}>Sleep Wellness Chatbot</li>
                      <li className="list-item" style={{ opacity: activeList === 'list2' ? 1 : 0, transition: 'opacity 0.5s ease' }}>Facemask Detection App</li>
                      <li className="list-item" style={{ opacity: activeList === 'list2' ? 1 : 0, transition: 'opacity 0.5s ease' }}>Wildlife and Pest Animal Detection</li>
                    </ul>
                  </>
                )}
                {segmentsData[segmentId].listId === 'list3' && (
                  <>
                    <h1>Sorren</h1>
                    <p style={{ opacity: activeList === 'list3' ? 1 : 0, transition: 'opacity 0.5s ease' }}>I’m a Full-stack developer with a background in UX design and human-computer interaction.</p>
                  </>
                )}
                {segmentsData[segmentId].listId === 'list4' && (
                  <>
                    <h1>Web Apps</h1>
                    <ul>
                      <li className="list-item" style={{ opacity: activeList === 'list4' ? 1 : 0, transition: 'opacity 0.5s ease' }}>Virtual Pet Web Application</li>
                      <li className="list-item" style={{ opacity: activeList === 'list4' ? 1 : 0, transition: 'opacity 0.5s ease' }}>Map Listing Web Application</li>
                      <li className="list-item" style={{ opacity: activeList === 'list4' ? 1 : 0, transition: 'opacity 0.5s ease' }}>SFU Student Webpage Creator</li>
                    </ul>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
