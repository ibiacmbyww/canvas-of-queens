const conditions = [
  {
      "title": "Blinded",
      "strs": [
          "Can't see; all terrain is difficult.",
          "Automatically fail Perception checks needing vision.",
          "-4 status penalty to Perception if vision is the only precise sense.",
          "Immune to visual effects; overrides dazzled."
      ]
  },
  {
      "title": "Broken",
      "strs": [
          "Affects objects with HP less than or equal to Broken Threshold.",
          "Can't be used normally; no bonuses except armor.",
          "Broken armor grants item bonus to AC but imposes status penalty: -1 (light), -2 (medium), -3 (heavy).",
          "Penalties and limitations of broken items still apply.",
          "Effects making an item broken reduce its HP to the Broken Threshold if higher."
      ]
  },
  {
      "title": "Clumsy",
      "strs": [
          "Status penalty to Dexterity-based checks and DCs equal to the condition value."
      ]
  },
  {
      "title": "Concealed",
      "strs": [
          "Harder to target; attacker must pass a DC 5 flat check to affect you.",
          "Area effects ignore this check."
      ]
  },
  {
      "title": "Confused",
      "strs": [
          "Off-guard; can't treat anyone as ally.",
          "Must use actions to strike or cast offensive cantrips randomly determined.",
          "Can attack self if no other targets.",
          "Attempt DC 11 flat check to recover when damaged."
      ]
  },
  {
      "title": "Controlled",
      "strs": [
          "Controller dictates actions without spending their own."
      ]
  },
  {
      "title": "Dazzled",
      "strs": [
          "If vision is the only precise sense, all creatures and objects are concealed."
      ]
  },
  {
      "title": "Deafened",
      "strs": [
          "Can't hear; -2 status penalty to Perception involving sound.",
          "Must pass DC 5 flat check for auditory actions or lose the action.",
          "Immune to auditory effects."
      ]
  },
  {
      "title": "Doomed",
      "strs": [
          "Reduces maximum dying value by the doomed value.",
          "Doomed value decreases by 1 after a full night's rest."
      ]
  },
  {
      "title": "Drained",
      "strs": [
          "Status penalty to Constitution-based checks equal to drained value.",
          "Lose and reduce maximum HP by level times drained value.",
          "Drained value decreases by 1 after a full night's rest."
      ]
  },
  {
      "title": "Dying",
      "strs": [
          "Unconscious; value increases by 1 if damaged, 2 if critically hit.",
          "Recovery checks determine condition improvement or worsening.",
          "Gain wounded condition when losing dying."
      ]
  },
  {
      "title": "Encumbered",
      "strs": [
          "Clumsy 1; -10 feet to all Speeds, not below 5 feet."
      ]
  },
  {
      "title": "Enfeebled",
      "strs": [
          "Status penalty to Strength-based rolls and DCs equal to the condition value."
      ]
  },
  {
      "title": "Fascinated",
      "strs": [
          "-2 status penalty to Perception and skill checks.",
          "Can't use concentrate actions unrelated to the subject."
      ]
  },
  {
      "title": "Fatigued",
      "strs": [
          "-1 status penalty to AC and saving throws.",
          "Recover after a full night's rest."
      ]
  },
  {
      "title": "Fleeing",
      "strs": [
          "Must spend actions to escape the source of fear.",
          "Can't Delay or Ready."
      ]
  },
  {
      "title": "Frightened",
      "strs": [
          "Status penalty to checks and DCs equal to the condition value.",
          "Penalty decreases by 1 each turn."
      ]
  },
  {
      "title": "Grabbed",
      "strs": [
          "Off-guard and immobilized; must pass DC 5 flat check to manipulate actions."
      ]
  },
  {
      "title": "Hidden",
      "strs": [
          "Off-guard to you; must pass DC 11 flat check to target you.",
          "Area effects ignore this check."
      ]
  },
  {
      "title": "Immobilized",
      "strs": [
          "You are incapable of movement. You can't use any actions that have the move trait. If you're immobilized by something holding you in place and an external force would move you out of your space, the force must succeed at a check against either the DC of the effect holding you in place or the relevant defense (usually Fortitude DC) of the monster holding you in place."
      ]
  },
  {
      "title": "Invisible",
      "strs": [
          "Undetected; can be found using Perception against Stealth DC, becoming hidden.",
          "Can't become observed except by special means."
      ]
  },
  {
      "title": "Observed",
      "strs": [
          "In plain view; can observe with precise senses."
      ]
  },
  {
      "title": "Off-Guard",
      "strs": [
          "-2 circumstance penalty to AC."
      ]
  },
  {
      "title": "Paralyzed",
      "strs": [
          "Off-guard; can't act except Recall Knowledge or mental actions."
      ]
  },
  {
      "title": "Persistent Damage",
      "strs": [
          "Takes damage at end of each turn; roll DC 15 flat check to recover.",
          "Assisted recovery and immunities, resistances, and weaknesses apply."
      ]
  },
  {
      "title": "Petrified",
      "strs": [
          "Turned to stone; can't act or sense.",
          "Becomes an object with specific Bulk, AC, and Hardness."
      ]
  },
  {
      "title": "Prone",
      "strs": [
          "Off-guard; -2 circumstance penalty to attack rolls.",
          "Limited to Crawl and Stand for movement."
      ]
  },
  {
      "title": "Quickened",
      "strs": [
          "Gain 1 additional action at the start of each turn."
      ]
  },
  {
      "title": "Restrained",
      "strs": [
          "Off-guard and immobilized; limited to Escape or Force Open."
      ]
  },
  {
      "title": "Sickened",
      "strs": [
          "Status penalty on checks and DCs equal to the condition value.",
          "Can retch to attempt Fortitude save to reduce value."
      ]
  },
  {
      "title": "Slowed",
      "strs": [
          "Lose actions equal to the slowed value."
      ]
  },
  {
      "title": "Stunned",
      "strs": [
          "Lose actions equal to the stunned value; overrides slowed."
      ]
  },
  {
      "title": "Stupefied",
      "strs": [
          "Status penalty on Intelligence-, Wisdom-, and Charisma-based checks and DCs equal to the condition value.",
          "Must pass a flat check to cast spells."
      ]
  },
  {
      "title": "Unconscious",
      "strs": [
          "Can't act; -4 status penalty to AC, Perception, and Reflex saves.",
          "Fall prone and drop items; specific waking conditions apply."
      ]
  },
  {
      "title": "Undetected",
      "strs": [
          "Can't be seen; creatures must guess your square to target you."
      ]
  },
  {
      "title": "Unnoticed",
      "strs": [
          "Creature is unaware of your presence and undetected."
      ]
  },
  {
      "title": "Wounded",
      "strs": [
          "Gain wounded condition when losing dying.",
          "Ends with Treat Wounds or full HP restoration and rest."
      ]
  }
]

const socialConditions = [
  {
      "title": "Friendly",
      "strs": [
          "Likely to agree to simple, safe Requests unless hostile actions taken against them."
      ]
  },
  {
      "title": "Helpful",
      "strs": [
          "Likely to accept reasonable Requests unless hostile actions are taken against them."
      ]
  },
  {
      "title": "Hostile",
      "strs": [
          "Seeks to harm and won't accept Requests."
      ]
  },
  {
      "title": "Indifferent",
      "strs": [
          "Doesn't care about the character."
      ]
  },
  {
      "title": "Unfriendly",
      "strs": [
          "Dislikes and distrusts the character; won't accept Requests."
      ]
  },
]

export {conditions, socialConditions}