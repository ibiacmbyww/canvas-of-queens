import { useCallback, useEffect, useRef, useState } from 'react';
import bg1 from "./img/bg1.png";
import './App.scss';
import Actor from './types/Actor';
import Colors from './types/Colors';
import EditCharactersModal from './components/EditCharactersModal/EditCharactersModal';
import rollDice from './utils/rollDice';
import sortActorsByInitiative from './utils/sortActorsByInitiative';
import Controls from './components/Controls/Controls';
function App() {
  const radiansCoefficient = 180 / Math.PI
  const [actors, setActors] = useState<Actor[]>(
    () => {
      return sortActorsByInitiative(
        [
          {
            id: 0,
            displayName: "Alicia",
            playerName: "Alice",
            color: Colors.Purple,
            moveFt: 25,
            isPlaced: false,
            posX: 700,
            posY: 600,
            highlighted: false,
            isDeleted: false,
            moveRadiusFt: undefined,
            initiative: rollDice(20) + 7, // 7 = initiativeModifier
            initiativeModifier: 7,
            initiativeTiebreaker: 4
          },
          {
            id: 1,
            displayName: "Lt. Silbok",
            playerName: "GM",
            color: Colors.Vermilion,
            moveFt: 35,
            isPlaced: true,
            posX: 1608,
            posY: 420,
            highlighted: false,
            isDeleted: false,
            moveRadiusFt: undefined,
            initiative: rollDice(20) + 9, // 9 = initiativeModifier
            initiativeModifier: 9,
            initiativeTiebreaker: 4
          },
          {
            id: 2,
            displayName: "Sgt. Bayez",
            playerName: "GM",
            color: Colors.Red,
            moveFt: 35,
            isPlaced: true,
            posX: 1400,
            posY: 280,
            highlighted: false,
            isDeleted: false,
            moveRadiusFt: undefined,
            initiative: rollDice(20) + 5,
            initiativeModifier: 5, // 9 = initiativeModifier
            initiativeTiebreaker: 3
          }
        ]
      )
    }
  )
  
  const [fiveFtInPx] = useState<number>(70)
  const [oneFtInPx] = useState<number>(14)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [minZoomLevel, setMinZoomLevel] = useState<number>(1)
  const [maxZoomLevel, setMaxZoomLevel] = useState<number>(1)
  const [showControls, setShowControls] = useState<boolean>(true)
  const [zoomIncrementBy] = useState<number>(0.05)
  const [editCharactersMenuOpen, setEditCharactersMenuOpen] = useState<boolean>(false)
  const [bg1WidthAtDefaultZoom, setBG1WidthAtDefaultZoom] = useState<number>(0)

  const [moveModeActorIndex, setMoveModeActorIndex] = useState<undefined | number>(undefined)
  const [moveModeTriangleSideC, setMoveModeTriangleSideC] = useState<number>(0)
  const [moveModeAngle, setMoveModeAngle] = useState<number>(0)
  const [moveModeMoveTooFar, setMoveModeMoveTooFar] = useState<boolean>(false)
  const [moveModeEX, setMoveModeEX] = useState<number>(0)
  const [moveModeEY, setMoveModeEY] = useState<number>(0)

  const [placeModeActorIndex, setPlaceModeActorIndex] = useState<undefined | number>(undefined)
  const [placeMoveActive, setPlaceMoveActive] = useState<boolean>(false)

  const [battleModeActive, setBattleModeActive] = useState<boolean>(false)
  const [information, setInformation] = useState<JSX.Element | undefined>(undefined)

  // const [customMessage, setCustomMessage] = useState<JSX.Element>(<></>)

  const bgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

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
    const element = canvasRef.current;
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

      const moveModeUpdateMouseTracking = (event: MouseEvent) => {
        // event.stopPropagation()
        if (typeof moveModeActorIndex === "number") {
          const moveRadiusFt = actors[moveModeActorIndex].moveRadiusFt as number
          const actorPositionX = actors[moveModeActorIndex].posX * zoomLevel
          const actorPositionY = actors[moveModeActorIndex].posY * zoomLevel
          const sA = (window.scrollX + event.x) - actorPositionX
          const sB = (window.scrollY + event.y) - actorPositionY
          const sC = Math.sqrt((sA * sA) + (sB * sB))
          let a = radiansCoefficient * Math.atan2(sB, sA)
          setMoveModeEX(event.x)
          setMoveModeEY(event.y)
          setMoveModeTriangleSideC(sC)
          setMoveModeAngle(a)
          setMoveModeMoveTooFar(placeMoveActive ? false : sC > ((2.5 + moveRadiusFt) * oneFtInPx * zoomLevel))
          // setCustomMessage(
          //   <>
          //     <div>sC: {sC}</div>
          //   </>
          // )
          // )
          //     <div>moveRadiusFt: {moveRadiusFt}</div>
          //     <div>actorPositionX: {actorPositionX}</div>
          //     <div>actorPositionY: {actorPositionY}</div>
          //     <div>sA: {sA}</div>
          //     <div>sB: {sB}</div>
          //     <div>moveModeMoveTooFar: {sC > ((2.5 + moveRadiusFt) * oneFtInPx * zoomLevel) ? "Too far" : "OK"}</div>
        }
      }
    
      const moveModeOnClickHandler = (e: MouseEvent) => {
        if (!moveModeMoveTooFar) {
          setActors(
            (prevActors) => {
              return prevActors.map(
                (prevActor, i) => {
                  if (moveModeActorIndex === i) {
                    //abusing side effects for fun and profit
                    moveModeUpdateMouseTracking(e)
                    return {
                      ...prevActor,
                      posX: (e.x + window.scrollX) / zoomLevel,
                      posY: (e.y + window.scrollY) / zoomLevel
                    }
                  }
                  return prevActor
                }
              )
            }
          )
        }
      }
      if (typeof moveModeActorIndex === "number") {
        window.removeEventListener("mousemove", moveModeUpdateMouseTracking)
        window.removeEventListener("click", moveModeOnClickHandler)
        window.addEventListener("mousemove", moveModeUpdateMouseTracking)
        window.addEventListener("click", moveModeOnClickHandler)
      } else {
        window.removeEventListener("mousemove", moveModeUpdateMouseTracking)
        window.removeEventListener("click", moveModeOnClickHandler)
      }
      return () => {
        window.removeEventListener("mousemove", moveModeUpdateMouseTracking)
        window.removeEventListener("click", moveModeOnClickHandler)
      }
    },
    [actors, moveModeActorIndex, moveModeMoveTooFar, oneFtInPx, radiansCoefficient, zoomLevel, placeMoveActive]
  )

  useEffect(
    () => {
      const placeModeOnClickHandler = (e: MouseEvent) => {
        setActors(
          (prevActors) => {
            return prevActors.map(
              (prevActor, i) => {
                if (placeModeActorIndex === i) {
                  return {
                    ...prevActor,
                    posX: (e.x + window.scrollX) / zoomLevel,
                    posY: (e.y + window.scrollY) / zoomLevel,
                    isPlaced: true
                  }
                }
                return prevActor
              }
            )
          }
        )
        setPlaceModeActorIndex(undefined)
      }
      const placeModeUpdateMouseTracking = (event: MouseEvent) => {
        // event.stopPropagation()
        if (typeof placeModeActorIndex === "number") {
          setMoveModeEX(event.x)
          setMoveModeEY(event.y)
        }
      }
      if (typeof placeModeActorIndex === "number") {
        window.removeEventListener("click", placeModeOnClickHandler)
        window.removeEventListener("mousemove", placeModeUpdateMouseTracking)
        window.addEventListener("click", placeModeOnClickHandler)
        window.addEventListener("mousemove", placeModeUpdateMouseTracking)
      } else {
        window.removeEventListener("click", placeModeOnClickHandler)
        window.removeEventListener("mousemove", placeModeUpdateMouseTracking)
      }
      return () => {
        window.removeEventListener("click", placeModeOnClickHandler)
        window.removeEventListener("mousemove", placeModeUpdateMouseTracking)
      }
    },
    [placeModeActorIndex, zoomLevel]
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
      <div className={`canvas${moveModeMoveTooFar ? " too-far" : ""}`} ref={canvasRef}>
        {typeof moveModeActorIndex === "number" || typeof placeModeActorIndex === "number"
          ? <div
              className="ghost"
              style={
                {
                  left: `${moveModeEX}px`,
                  top:  `${moveModeEY}px`,
                  width: `${fiveFtInPx * zoomLevel}px`,
                  height: `${fiveFtInPx * zoomLevel}px`,
                }
              }
            >
              {(typeof moveModeActorIndex === "number" || (typeof moveModeActorIndex === "number" && actors[moveModeActorIndex].isPlaced)) && 
                <span>
                  {
                    parseFloat(
                        (((-2.5 * zoomLevel) + (moveModeTriangleSideC / oneFtInPx)) / zoomLevel).toFixed(1)
                    )
                  }ft</span>
                }
            </div>
          : <></>
        }
        {typeof moveModeActorIndex === "number"
          ? <div
              className="line"
              style={
                {
                  left: (zoomLevel * (actors[moveModeActorIndex].posX)),
                  top:  (zoomLevel * (actors[moveModeActorIndex].posY)),
                  width: `${moveModeTriangleSideC}px`,
                  transform: `rotate(${moveModeAngle}deg)`
                }
              }
            ></div>
          : <></>
        }
        {actors.map(
          (actor, index) => {
            return actor.isPlaced
              ? <div
                  className="actor"
                  style={
                    {
                      left: `${(actor.posX - (2.5 * oneFtInPx)) * zoomLevel}px`,
                      top:  `${(actor.posY - (2.5 * oneFtInPx)) * zoomLevel}px`,
                      height: `${fiveFtInPx * zoomLevel}px`,
                      width: `${fiveFtInPx * zoomLevel}px`
                    }
                  }
                >
                  <div className="radius"
                    style={
                      placeMoveActive
                        ? {
                          height: "0",
                          width: "0"
                        }
                        : actor.moveRadiusFt && (moveModeActorIndex === index)
                          ? {
                            height: `${zoomLevel * oneFtInPx * ((2.5 + actor.moveRadiusFt) * 2)}px`,
                            width:  `${zoomLevel * oneFtInPx * ((2.5 + actor.moveRadiusFt) * 2)}px`
                          }
                          : {}
                    }
                  ></div>
                  <div className="info">
                    <span className="name">{actor.displayName}</span>
                    <small>{actor.playerName}</small>
                  </div>
                  <div
                    className={`actor-dot${actor.highlighted || (index === moveModeActorIndex && placeMoveActive) ? " highlighted" : ""}`}
                    style={
                      {
                        background: actor.color
                      }
                    }
                  ></div>
                </div>
              : <></>
          }
        )}
      </div>
      {information && (
        <div className="information">
          {information}
        </div>
      )}
      <Controls
        showControls={showControls}
        zoomLevel={zoomLevel}
        actors={actors}
        setActors={setActors}
        placeModeActorIndex={placeModeActorIndex}
        setPlaceModeActorIndex={setPlaceModeActorIndex}
        setPlaceMoveActive={setPlaceMoveActive}
        moveModeActorIndex={moveModeActorIndex}
        setMoveModeActorIndex={setMoveModeActorIndex}
        setMoveModeMoveTooFar={setMoveModeMoveTooFar}
        battleModeActive={battleModeActive}
        setBattleModeActive={setBattleModeActive}
        setEditCharactersMenuOpen={setEditCharactersMenuOpen}
        setInformation={setInformation} />
    </div>
  );
}

export default App;
