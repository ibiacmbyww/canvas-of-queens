import React, { WheelEvent, useCallback, useEffect, useRef, useState } from 'react';
import bg1 from "./img/bg1.png";
import './App.scss';
import { MouseEventHandler } from 'react';
import Actor from './types/Actor';

function App() {
  const [nextID, setNextID] = useState<number>(0)
  
  const [fiveFtInPx] = useState<number>(70)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [minZoomLevel, setMinZoomLevel] = useState<number>(1)
  const [maxZoomLevel, setMaxZoomLevel] = useState<number>(1)
  const [zoomLevelSteps] = useState<number>(30)
  // const [bg1Initialised, setBG1Initialised] = useState<boolean>(false)
  const [zoomIncrementBy, setZoomIncrementBy] = useState<number>(0)
  const [scrollX, setScrollX] = useState<number>(0)
  const [scrollY, setScrollY] = useState<number>(0)
  const [bg1WidthAtDefaultZoom, setBG1WidthAtDefaultZoom] = useState<number>(0)
  // const [leftMouseDown, setLeftMouseDown] = useState<boolean>(false)
  // const [middleMouseDown, setMiddleMouseDown] = useState<boolean>(false)
  // const [rightMouseDown, setRightMouseDown] = useState<boolean>(false)
  const [actors, setActors] = useState<Actor[]>([
    {
      id: 0,
      displayName: "Alicia",
      playerName: "Alice",
      posX: 1800,
      posY: 600
    }
  ])

  const bgRef = useRef<HTMLImageElement>(null);

  function bgLoadedHandler() {
    const element = bgRef.current;
    if (element) {
      const windowWidth = window.innerWidth
      const imgWidth = element.naturalWidth ?? 0
      setBG1WidthAtDefaultZoom(imgWidth)
      setZoomLevel(1)
      const gridColumnsShown = windowWidth / fiveFtInPx;
      const zoomLevelWhenThreeGridColumnsShown = parseFloat((1/(3/gridColumnsShown)).toPrecision(3))
      const imgWidthInColumns = imgWidth / fiveFtInPx
      const zoomLevelWhenAllGridColumnsShown = parseFloat((1/(imgWidthInColumns/gridColumnsShown)).toPrecision(3))
      const zoomTick = (zoomLevelWhenThreeGridColumnsShown - zoomLevelWhenAllGridColumnsShown) / zoomLevelSteps
      setMaxZoomLevel(zoomLevelWhenThreeGridColumnsShown)
      setMinZoomLevel(zoomLevelWhenAllGridColumnsShown)
      setZoomIncrementBy(zoomTick)
      // element.removeEventListener('wheel');
    }
  }

  const hw = useCallback(
    (ev: Event): void => {
      ev.preventDefault();
      const event = ev;
      debugger;
      if ("deltaY" in ev) {
        //@ts-ignore-next-line
        if (event.deltaY < 0) {
          //is scroll UP
          if ((zoomLevel + zoomIncrementBy) <= maxZoomLevel) {
            setZoomLevel((z) => z + zoomIncrementBy)
          }
        } else {
          //is scroll DOWN
          if ((zoomLevel - zoomIncrementBy) > minZoomLevel) {
            setZoomLevel((z) => z - zoomIncrementBy)
          }
        }
      }
    },
    [maxZoomLevel, minZoomLevel, zoomIncrementBy, zoomLevel]
  )

  useEffect(() => {
    debugger;
    const element = bgRef.current;
    if (element) {
      debugger;
      element.addEventListener(
        'wheel',
        hw,
        { passive: false }
      )
    }
    return () => {
      if (element) {
        element.removeEventListener('wheel', hw);
      }
    };
  }, [zoomLevel, hw])

  debugger;
  return (
    <div className="App">
      <img
        src={bg1}
        ref={bgRef}
        style={
          {
            minWidth: `${(bg1WidthAtDefaultZoom ?? window.innerWidth) * zoomLevel}px`,
            maxWidth: `${(bg1WidthAtDefaultZoom ?? window.innerWidth) * zoomLevel}px`
          }
        }
        onLoad={bgLoadedHandler} />
      {actors.map(
        (actor) => {
          return <div className="actor"
            style={
              {
                left: `${actor.posX}px`,
                top: `${actor.posY}px`,
                height: `${fiveFtInPx}px`,
                width: `${fiveFtInPx}px`,
                background: "pink"
              }
            }></div>
        }
      )}
      <div className="controls">
        <h1>Zoom</h1>
        <input type="range" min="1" max={maxZoomLevel ?? 1} value={zoomLevel} step={zoomIncrementBy} />
        <p>
          Current: {zoomLevel}
          <br />
          Min: {minZoomLevel}
          <br />
          Max: {maxZoomLevel}
        </p>
        <h1>Characters</h1>
        <div className="actors-list">
          <ul>
            {actors.length
              ? actors.map(
                  (actor) => {
                    return <li>{actor.displayName}</li>
                  }
                )
              : <li className="empty">None</li>
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
