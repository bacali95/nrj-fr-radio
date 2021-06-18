import React from 'react';

class SVG {
  static AnimatedBars() {
    const width = 15;
    const bars = [
      {
        startHeight: 40,
        endHeight: 60,
        speed: 0.6,
      },
      {
        startHeight: 30,
        endHeight: 80,
        speed: 0.6,
      },
      {
        startHeight: 60,
        endHeight: 45,
        speed: 0.6,
      },
    ];

    return (
      <svg height="50" width="50" viewBox={`0 0 ${bars.length * width - 5} 100`} fill="#ff">
        {bars.map(({ startHeight, endHeight, speed }, index) => (
          <rect
            key={`${startHeight}-${endHeight}`}
            height={startHeight}
            width={width}
            rx="5"
            x={index * (width + 5)}
            y={100 - startHeight}
            fill="currentColor"
          >
            <animate
              attributeName="height"
              attributeType="XML"
              type="translate"
              values={`${endHeight};${startHeight};${endHeight}`}
              dur={speed}
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              attributeType="XML"
              type="translate"
              values={`${100 - endHeight};${100 - startHeight};${100 - endHeight}`}
              dur={speed}
              repeatCount="indefinite"
            />
          </rect>
        ))}
      </svg>
    );
  }

  static CardPlayButton() {
    return (
      <svg width="50" height="50" viewBox="0 0 32 32">
        <path
          fill="currentColor"
          d="M7.3,2C6.9,2,6.4,2.1,6.1,2.4C4.9,2.9,4.8,3.9,4.8,4.2v23.5c0,1,0.7,1.6,1.2,1.9C6.3,29.9,6.7,30,7.2,30c0.1,0,0.2,0,0.3,0 c0,0,0,0,0.1,0l0,0c0.4,0,0.7-0.1,1.1-0.2c0.1,0,0.3-0.1,0.4-0.2l21.7-11.8c0.3-0.1,0.8-0.5,1.1-1.2c0.2-0.6,0.2-1.1-0.1-1.6 c-0.1-0.2-0.2-0.4-0.4-0.5l-0.2-0.2c-0.1-0.1-0.3-0.2-0.4-0.3L8.7,2.4C8.3,2.1,7.7,2,7.3,2L7.3,2z"
        />
      </svg>
    );
  }

  static PreviousButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <svg width="24" height="25" viewBox="0 0 17 18" onClick={onClick}>
      <path d="M0 0h2v18H0V0zM4 9l13-9v18L4 9z" fill="currentColor" />
    </svg>
  );

  static PlayPauseButton: React.FC<{ paused: boolean; setPaused: (value: boolean) => void }> = ({
    paused,
    setPaused,
  }) => (
    <svg height="75" width="75" viewBox="0 0 50 50" fill="none" onClick={() => setPaused(!paused)}>
      <circle
        className="text-gray-400 dark:text-gray-500"
        cx="25"
        cy="25"
        r="24"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path fill={paused ? 'none' : 'currentColor'} d="M18 16h4v18h-4V16zM28 16h4v18h-4z" />
      <path
        fill={!paused ? 'none' : 'currentColor'}
        d="m35.83775,24.35328l0,0l-15.54984,-8.98869l0,0.00975c-0.10724,-0.05849 -0.21448,-0.10724 -0.35097,-0.10724c-0.38996,0 -0.70194,0.31197 -0.70194,0.70194l0.0195,0.07799l-0.0195,0l0,17.95787l0.0195,0c0.039,0.35097 0.33147,0.62394 0.69219,0.62394c0.12674,0 0.24373,-0.039 0.35097,-0.10724l0.00975,0.0195l15.54984,-8.97894l-0.00975,-0.0195c0.21448,-0.11699 0.36072,-0.34122 0.36072,-0.60445s-0.15599,-0.45821 -0.37047,-0.58495z"
      />
    </svg>
  );

  static NextButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <svg width="24" height="25" viewBox="0 0 17 18" fill="none" onClick={onClick}>
      <path d="M17 0H15V18H17V0Z" fill="currentColor" />
      <path d="M13 9L0 0V18L13 9Z" fill="currentColor" />
    </svg>
  );

  static DarkModeButton: React.FC<{ darkMode: boolean; setDarkMode: (value: boolean) => void }> = ({
    darkMode,
    setDarkMode,
  }) => (
    <svg width="30" height="30" viewBox="0 0 20 20" onClick={() => setDarkMode(!darkMode)}>
      <path
        fill={darkMode ? 'none' : 'currentColor'}
        d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
      />
      <path
        fill={!darkMode ? 'none' : 'currentColor'}
        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );

  static HdQualityButton: React.FC<{
    hdQuality: boolean;
    setHdQuality: (value: boolean) => void;
  }> = ({ hdQuality, setHdQuality }) => (
    <svg width="30" height="30" viewBox="0 0 32 32" onClick={() => setHdQuality(!hdQuality)}>
      <path
        fill={!hdQuality ? 'none' : 'currentColor'}
        d="M20.8,13.6H19v5.3h1.8c0.7,0,1.4-0.2,2-0.7c1-1.1,1-2.8,0-3.9C22.3,13.8,21.5,13.6,20.8,13.6z M28.1,5.4H3.9 C2,5.4,0.5,7,0.5,8.9v14.2c0,1.9,1.5,3.5,3.4,3.3h24.2c1.9,0,3.4-1.5,3.4-3.4V8.8C31.5,6.9,30,5.4,28.1,5.4z M15,20.5h-2V17H9.2v3.5 h-2V12h2v3.4H13V12h2V20.5z M25,18.5c-0.4,0.7-1,1.2-1.7,1.5s-1.6,0.5-2.4,0.5H17V12h3.9c0.8,0,1.6,0.1,2.4,0.5 c0.7,0.3,1.3,0.9,1.7,1.5C25.8,15.4,25.8,17.1,25,18.5z"
      />
      <path
        fill={hdQuality ? 'none' : 'currentColor'}
        d="M28.1,5.4H3.9C2,5.4,0.5,7,0.5,8.9v14.2c0,1.9,1.5,3.4,3.4,3.4h24.2c1.9,0,3.4-1.5,3.4-3.4V8.9C31.5,7,30,5.4,28.1,5.4z M28.1,25.3H3.9c-1.2,0-2.1-1-2.1-2.1V8.9c0-1.2,1-2.1,2.1-2.1h24.2c1.2,0,2.1,1,2.1,2.1l0,14.2C30.2,24.3,29.3,25.3,28.1,25.3z M13,15.4H9.2V12h-2v8.5h2V17H13v3.5h2V12l-2,0V15.4z M23.3,12.5c-0.8-0.4-1.6-0.5-2.4-0.5H17v8.5h3.9c0.8,0,1.7-0.2,2.4-0.5 c0.7-0.3,1.3-0.8,1.7-1.5c0.8-1.4,0.8-3.1,0-4.5C24.6,13.4,24,12.9,23.3,12.5z M22.8,18.2c-0.6,0.5-1.3,0.7-2,0.7l-1.8,0v-5.3h1.8 c0.7,0,1.5,0.2,2,0.7C23.8,15.4,23.8,17.1,22.8,18.2z"
      />
    </svg>
  );
}

export default SVG;
