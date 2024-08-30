import AppData from "../types/AppData";
import MissionData from "../types/MissionData";
import {default as _00_exterior} from "./maps/adamantine-mine/00-exterior";
import {default as _01_entrance} from "./maps/adamantine-mine/01-entrance";
import {default as _02_koboldTown} from "./maps/adamantine-mine/02-kobold-town";
import {default as _03_zombieEncounter} from "./maps/adamantine-mine/03-zombie-encounter";
import {default as _04_spiderFort} from "./maps/adamantine-mine/04-spider-fort";
import {default as _05_vipEntranceBackRoute} from "./maps/adamantine-mine/05-vip-entrance-back-route";
import {default as _06_xornEncounter} from "./maps/adamantine-mine/06-xorn-encounter";
import {default as _07_valuableOreRailNexus} from "./maps/adamantine-mine/07-valuable-ore-rail-nexus";
import {default as _08_azerEncounter} from "./maps/adamantine-mine/08-azer-encounter";

const allMissionData: MissionData[] = [
  {
    folderString: "adamantine-mine",
    displayName: "Adamantine Mine",
    maps: [
      _00_exterior,
      _01_entrance,
      _02_koboldTown,
      _03_zombieEncounter,
      _04_spiderFort,
      _05_vipEntranceBackRoute,
      _06_xornEncounter,
      _07_valuableOreRailNexus,
      _08_azerEncounter
    ]
  }
]

const appData: AppData = {
  missionData: allMissionData
}

export default appData