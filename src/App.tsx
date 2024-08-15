import React, { WheelEvent, useEffect, useRef, useState } from 'react';
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
  const [bg1Initialised, setBG1Initialised] = useState<boolean>(false)
  const [zoomIncrementBy, setZoomIncrementBy] = useState<number>(0)
  const [scrollX, setScrollX] = useState<number>(0)
  const [scrollY, setScrollY] = useState<number>(0)
  const [bg1WidthAtDefaultZoom, setBG1WidthAtDefaultZoom] = useState<number>(0)
  const [leftMouseDown, setLeftMouseDown] = useState<boolean>(false)
  const [middleMouseDown, setMiddleMouseDown] = useState<boolean>(false)
  const [rightMouseDown, setRightMouseDown] = useState<boolean>(false)
  const [actors, setActors] = useState<Actor[]>([
    {
      id: 0,
      displayName: "Maaaarv",
      playerName: "Alice",
      posX: 1800,
      posY: 600
    }
  ])
  // const [viewOffsetX, setViewOffsetX] = useState(0);
  // const [viewOffsetY, setViewOffsetY] = useState(0);
  const bg1Ref = useRef<HTMLImageElement>(null)
  
  const bgScrollHandler = (ev: globalThis.WheelEvent) => {
    ev.preventDefault()
    debugger;
    console.log(ev)
    if (ev.deltaY < 0) {
      //is scroll UP
      if ((zoomLevel + zoomIncrementBy) <= maxZoomLevel) {
        setZoomLevel((z) => z + zoomIncrementBy)
      }
    } else {
      //is scroll DOWN
      if ((zoomLevel - zoomIncrementBy) >= minZoomLevel) {
        setZoomLevel((z) => z - zoomIncrementBy)
      }
    }
    // setViewOffsetX(window.scrollX)
    // setViewOffsetY(window.scrollY)
  }
  const handleWheel = function(this: HTMLImageElement, ev: Event): void {
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
        if ((zoomLevel - zoomIncrementBy) >= minZoomLevel) {
          setZoomLevel((z) => z - zoomIncrementBy)
        }
      }
    }
  };

  const useNonPassiveWheel = (handler: (this: HTMLImageElement, event: Event) => void) => {
    const elementRef = useRef<HTMLImageElement>(null);
  
    useEffect(
      () => {
        const element = elementRef.current;
        if (element) {
          debugger;
          const windowWidth = window.innerWidth
          const imgWidth = element.clientWidth ?? 0
          setZoomLevel(1)
          const gridColumnsShown = windowWidth / fiveFtInPx;
          const zoomLevelWhenThreeGridColumnsShown = parseFloat((1/(3/gridColumnsShown)).toPrecision(3))
          setMaxZoomLevel(zoomLevelWhenThreeGridColumnsShown)
          const imgWidthInColumns = imgWidth / fiveFtInPx
          const zoomLevelWhenAllGridColumnsShown = parseFloat((1/(imgWidthInColumns/gridColumnsShown)).toPrecision(3))
          setMinZoomLevel(zoomLevelWhenAllGridColumnsShown)
          const zoomTick = (zoomLevelWhenThreeGridColumnsShown - zoomLevelWhenAllGridColumnsShown) / zoomLevelSteps
          setZoomIncrementBy(zoomTick)
          setBG1Initialised(true)
          element.removeEventListener('wheel', handler);
          element.addEventListener('wheel', handler, { passive: false });
        }
        return () => {
          if (element) {
            element.removeEventListener('wheel', handler);
          }
        };
      },
      [handler]
    )
  
    return elementRef;
  }

  const bgRef = useNonPassiveWheel(handleWheel);

  const bgMouseDown: MouseEventHandler = (e) => {
    if (e.button === 0) {
      //left click
    // debugger;
    }
    if (e.button === 1) {
      //middle click
    // debugger;
    }
    if (e.button === 2) {
      //right click
    // debugger;
    }
  }

  const bgMouseUp: MouseEventHandler = (e) => {
    if (e.button === 0) {
      //left click
    // debugger;
    }
    if (e.button === 1) {
      //middle click
    // debugger;
    }
    if (e.button === 2) {
      //right click
    // debugger;
    }
  }

  const bgMouseMove: MouseEventHandler = (e) => {
    // debugger;
  }

  debugger;
  return (
    <div className="App">
      <img src={bg1} onMouseDown={bgMouseDown} onMouseUp={bgMouseUp} onMouseMove={bgMouseMove} ref={bgRef} style={{minWidth: `${(bg1WidthAtDefaultZoom ?? window.innerWidth) * zoomLevel}px`}} />
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
