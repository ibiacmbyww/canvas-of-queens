import React, { WheelEvent, useCallback, useEffect, useRef, useState } from 'react';
import bg1 from "./img/bg1.png";
import './App.scss';
import { MouseEventHandler } from 'react';
import Actor from './types/Actor';
import Colors from './types/Colors';
import EditCharactersModal from './components/EditCharactersModal/EditCharactersModal';

function App() {
  const [nextID, setNextID] = useState<number>(-1)
  
  const [fiveFtInPx] = useState<number>(70)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [minZoomLevel, setMinZoomLevel] = useState<number>(1)
  const [maxZoomLevel, setMaxZoomLevel] = useState<number>(1)
  // const [bg1Initialised, setBG1Initialised] = useState<boolean>(false)
  const [showControls, setShowControls] = useState<boolean>(true)
  const [zoomIncrementBy] = useState<number>(0.1)
  const [scrollX, setScrollX] = useState<number>(0)
  const [scrollY, setScrollY] = useState<number>(0)
  const [bg1WidthAtDefaultZoom, setBG1WidthAtDefaultZoom] = useState<number>(0)
  // const [bg1HeightAtDefaultZoom, setBG1HeightAtDefaultZoom] = useState<number>(0)
  // const [leftMouseDown, setLeftMouseDown] = useState<boolean>(false)
  // const [middleMouseDown, setMiddleMouseDown] = useState<boolean>(false)
  // const [rightMouseDown, setRightMouseDown] = useState<boolean>(false)

  const newID = () => {
    const idPlusOne = nextID + 1
    setNextID(idPlusOne)
    return idPlusOne
  }

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
          posX: 1800,
          posY: 600,
          highlighted: false
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
          highlighted: false
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
      const imgHeight = element.naturalHeight ?? 0
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

  return (
    <div className="App">
      <EditCharactersModal open={true} data={actors} dataSetter={setActors} map={bgRef} />
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
      {actors.map(
        (actor) => {
          return <div className={`actor${actor.highlighted ? " highlighted" : ""}`}
            style={
              {
                left: `${actor.posX * zoomLevel}px`,
                top: `${actor.posY * zoomLevel}px`,
                height: `${fiveFtInPx * zoomLevel}px`,
                width: `${fiveFtInPx * zoomLevel}px`,
                background: actor.color
              }
            }></div>
        }
      )}
      <div className="controls" style={{display: showControls ? "block" : "none"}}>
        <div className="actors-list-section">
          <h1>Characters</h1>
          <ul>
            {actors.length
              ? actors.map(
                  (actor) => {
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
                      </li>
                    )
                  }
                )
              : <li className="empty">None</li>
            }
          </ul>
          <button
            onClick={() => {
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
