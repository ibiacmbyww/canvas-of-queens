import React, { WheelEvent, useCallback, useEffect, useRef, useState } from 'react';
import bg1 from "./img/bg1.png";
import './App.scss';
import { MouseEventHandler } from 'react';
import Actor from './types/Actor';
import Colors from './types/Colors';
import EditCharactersModal from './components/EditCharactersModal/EditCharactersModal';

function App() {
  const radiansCoefficient = 180 / Math.PI
  const [nextID, setNextID] = useState<number>(-1)
  
  const [fiveFtInPx] = useState<number>(70)
  const [oneFtInPx] = useState<number>(14)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [minZoomLevel, setMinZoomLevel] = useState<number>(1)
  const [maxZoomLevel, setMaxZoomLevel] = useState<number>(1)
  // const [bg1Initialised, setBG1Initialised] = useState<boolean>(false)
  const [showControls, setShowControls] = useState<boolean>(true)
  const [zoomIncrementBy] = useState<number>(0.1)
  const [scrollX, setScrollX] = useState<number>(0)
  const [scrollY, setScrollY] = useState<number>(0)
  const [editCharactersMenuOpen, setEditCharactersMenuOpen] = useState<boolean>(false)
  const [bg1WidthAtDefaultZoom, setBG1WidthAtDefaultZoom] = useState<number>(0)
  const [moveMode, setMoveMode] = useState<false | number>(false)
  const [sideA, setSideA] = useState<number>(0)
  const [sideB, setSideB] = useState<number>(0)
  const [sideC, setSideC] = useState<number>(0)
  const [moveModeAngle, setMoveModeAngle] = useState<number>(0)
  const [customMessage, setCustomMessage] = useState<JSX.Element>(<></>)
  // const [bg1HeightAtDefaultZoom, setBG1HeightAtDefaultZoom] = useState<number>(0)
  // const [leftMouseDown, setLeftMouseDown] = useState<boolean>(false)
  // const [middleMouseDown, setMiddleMouseDown] = useState<boolean>(false)
  // const [rightMouseDown, setRightMouseDown] = useState<boolean>(false)

  const [actors, setActors] = useState<Actor[]>(
    () => {
      return [
        {
          id: 0,
          displayName: "Alicia",
          playerName: "Alice",
          color: Colors.Purple,
          moveFt: 25,
          isPlaced: true,
          posX: 700,
          posY: 600,
          highlighted: false,
          isDeleted: false,
          radiusFt: 27
        },
        {
          id: 1,
          displayName: "Lt. Silbok",
          playerName: "GM",
          color: Colors.Red,
          moveFt: 35,
          isPlaced: true,
          posX: 1600,
          posY: 200,
          highlighted: false,
          isDeleted: false,
          radiusFt: false
        }
      ]
    }
  )
  const bgRef = useRef<HTMLImageElement>(null)

  const wheelEventHandler = useCallback(
    (event: Event): void => {
      event.preventDefault();
      if ("deltaY" in event) {
        //@ts-ignore-next-line
        if (event.deltaY < 0) {
          //is scroll UP
          if ((zoomLevel + zoomIncrementBy) <= maxZoomLevel) {
            setZoomLevel((z) => z + zoomIncrementBy)
          } else {
            setZoomLevel((z) => maxZoomLevel)
          }
        } else {
          //is scroll DOWN
          if ((zoomLevel - zoomIncrementBy) > minZoomLevel) {
            setZoomLevel((z) => z - zoomIncrementBy)
          } else {
            setZoomLevel((z) => minZoomLevel)
          }
        }
      }
    },
    [maxZoomLevel, minZoomLevel, zoomIncrementBy, zoomLevel]
  )
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
  useEffect(
    () => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'm' || event.key === 'M') {
          setShowControls((s) => {return !s})
        }
      }

      window.addEventListener('keydown', handleKeyDown)

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      }
    },
    []
  )

  useEffect(() => {
    const element = bgRef.current;
    if (element) {
      element.addEventListener(
        'wheel',
        wheelEventHandler,
        { passive: false }
      )
    }
    return () => {
      if (element) {
        element.removeEventListener('wheel', wheelEventHandler);
      }
    };
  }, [zoomLevel, wheelEventHandler])

  const bgLoadedHandler = () => {
    const element = bgRef.current;
    if (element) {
      const windowWidth = window.innerWidth
      const imgWidth = element.naturalWidth ?? 0
      // const imgHeight = element.naturalHeight ?? 0
      setBG1WidthAtDefaultZoom(imgWidth)
      setZoomLevel(1)
      const gridColumnsShown = windowWidth / fiveFtInPx;
      const zoomLevelWhenThreeGridColumnsShown = parseFloat((1/(3/gridColumnsShown)).toPrecision(3))
      const imgWidthInColumns = imgWidth / fiveFtInPx
      const zoomLevelWhenAllGridColumnsShown = parseFloat((1/(imgWidthInColumns/gridColumnsShown)).toPrecision(3))
      setMaxZoomLevel(zoomLevelWhenThreeGridColumnsShown)
      setMinZoomLevel(zoomLevelWhenAllGridColumnsShown)
    }
  }
  
  // const bgMouseMove: MouseEventHandler =  (this: Window, ev: MouseEvent) => {
  //   // if (e.button === 0) {
  //   //   //left click
  //   // // debugger;
  //   // }
  //   // if (e.button === 1) {
  //   //   //middle click
  //   // // debugger;
  //   // }
  //   // if (e.button === 2) {
  //   //   //right click
  //   // // debugger;
  //   // }
  // }

  useEffect(
    () => {
      if (typeof moveMode === "number") {
        const actorPositionX = actors[moveMode].posX * zoomLevel
        const actorPositionY = actors[moveMode].posY * zoomLevel
        window.addEventListener("mousemove", (e) => {
          const sA = e.x - actorPositionX
          const sB = e.y - actorPositionY
          const sC = Math.sqrt((sA * sA) + (sB * sB))
          let a = radiansCoefficient * Math.atan2(sB, sA)
          debugger;
          setSideA(sA)
          setSideB(sB)
          setSideC(sC)
          setMoveModeAngle(a)
          setCustomMessage(
            <>
              <div>e.x: {e.x}</div>
              <div>e.y: {e.y}</div>
              <div>aX: {actorPositionX}</div>
              <div>aY: {actorPositionY}</div>
            </>
          )

        })
      }
    },
    [moveMode]
  )

  return (
    <div className="App">
      <EditCharactersModal open={editCharactersMenuOpen} data={actors} dataSetter={setActors} map={bgRef} openSetter={setEditCharactersMenuOpen} />
      <img
        alt=""
        src={bg1}
        ref={bgRef}
        style={
          {
            minWidth: `${(bg1WidthAtDefaultZoom ?? window.innerWidth) * zoomLevel}px`,
            maxWidth: `${(bg1WidthAtDefaultZoom ?? window.innerWidth) * zoomLevel}px`
          }
        }
        onLoad={bgLoadedHandler}
      />
      {typeof moveMode === "number"
        ? <div
            className="line"
            style={
              {
                left: (zoomLevel * (actors[moveMode].posX)),
                top:  (zoomLevel * (actors[moveMode].posY)),
                width: `${sideC * zoomLevel}px`,
                transform: `rotate(${moveModeAngle}deg)`
                
              }
            }
          ></div>
        : <></>
      }
      {actors.map(
        (actor, index) => {
          return (
            <div
              className="actor-wrapper"
              style={
                {
                  left: `${(actor.posX - (2.5 * oneFtInPx)) * zoomLevel}px`,
                  top: `${(actor.posY - (2.5 * oneFtInPx)) * zoomLevel}px`,
                  height: `${fiveFtInPx * zoomLevel}px`,
                  width: `${fiveFtInPx * zoomLevel}px`
                }
              }
            >
              <div className="radius"
                style={
                  actor.radiusFt && (moveMode === index)
                    ? {
                      height: `${(oneFtInPx * (5 + actor.radiusFt)) * zoomLevel}px`,
                      width:  `${(oneFtInPx * (5 + actor.radiusFt)) * zoomLevel}px`
                    }
                    : {}
                }
              ></div>
              <div
                className={`actor${actor.highlighted ? " highlighted" : ""}`}
                style={
                  {
                    background: actor.color
                  }
                }
              ></div>
            </div>
          )
        }
      )}
      <div className="controls" style={{display: showControls ? "block" : "none"}}>
        <div>a: {typeof sideA === "number" ? sideA : "UNSET"}</div>
        <div>b: {typeof sideB === "number" ? sideB : "UNSET"}</div>
        <div>c: {typeof sideC === "number" ? sideC : "UNSET"}</div>
        <div>m: {typeof moveModeAngle === "number" ? moveModeAngle : "UNSET"}</div>
        {customMessage}
        <div className="actors-list-section">
          <h1>Characters</h1>
          <ul>
            {actors.length
              ? actors.map(
                  (actor, index) => {
                    return (
                      <li
                        key={actor.id}
                        onMouseEnter={()=> {
                          setActors((prevActors) => {
                            return prevActors.map((prevActor) => {
                              if (prevActor.id === actor.id) {
                                return {
                                  ...prevActor,
                                  highlighted: true
                                }
                              }
                              return prevActor;
                            });
                          })
                        }}
                        onMouseLeave={()=> {
                          setActors((prevActors) => {
                            return prevActors.map((prevActor) => {
                              if (prevActor.id === actor.id) {
                                return {
                                  ...prevActor,
                                  highlighted: false
                                }
                              }
                              return prevActor;
                            });
                          })
                        }}
                      >
                        <span className='blob' style={{background: actor.color}}></span>
                        <span className="name">{actor.displayName}</span>
                        <small>{actor.playerName}</small>
                        <div className="actor-buttons">
                          <button onClick={(e) => {
                            setMoveMode(index)
                          }}>🏃🏻‍♀️‍➡️</button>
                          <button>😇</button>
                          <button>🗡️</button>
                        </div>
                      </li>
                    )
                  }
                )
              : <li className="empty">None</li>
            }
          </ul>
          <button
            onClick={() => {
              setEditCharactersMenuOpen(true)
            }}
          >
            ✒️ Edit Characters
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
