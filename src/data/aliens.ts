import type { Alien } from "../types";

import heatblast from "../assets/alliens/heatblast.png";
import fourarms from "../assets/alliens/fourarms.png";
import upgrade from "../assets/alliens/fourarms.png";
import diamondhead from "../assets/alliens/diamondhead.png";
import xlr8 from "../assets/alliens/xlr8.png";
import ghostfreak from "../assets/alliens/ghostfreak.png";

export const aliens: Alien[] = [
  {
    id: 1,
    name: "HEATBLAST",
    title: "The Volcanic God",
    species: "Pyronite",
    planet: "Pyros",
    description:
      "A living supernova contained within a shell of volcanic rock. The Pyronite lifeform harnesses the primal energy of their sun-drenched home world to manipulate plasma at a molecular level.",
    powers: ["Pyrokinesis", "Enhanced Strength", "Flight (Via Fire)"],
    color: "#FF4500",
    image: heatblast,
  },
  {
    id: 2,
    name: "DIAMONDHEAD",
    title: "The Crystal Titan",
    species: "Petrosapien",
    planet: "Petropia",
    description:
      "An ancient warrior forged from the crystalline core of a dying planet. Every surface of its body is a weapon — harder than diamond, sharper than obsidian, and capable of refracting energy into devastating beams.",
    powers: ["Crystallokinesis", "Crystal Weapons", "Regeneration"],
    color: "#00CED1",
    image: diamondhead,
  },
  {
    id: 3,
    name: "XLR8",
    title: "The Speed Phantom",
    species: "Kineceleran",
    planet: "Kinet",
    description:
      "A predator that exists between moments. Moving at velocities that tear the air itself apart, the Kineceleran is less a creature and more a living shockwave — seen only in the destruction left behind.",
    powers: ["Superhuman Speed", "Enhanced Reflexes", "Sharp Claws"],
    color: "#1E90FF",
    image: xlr8,
  },
  {
    id: 4,
    name: "FOUR ARMS",
    title: "The War Titan",
    species: "Tetramand",
    planet: "Khoros",
    description:
      "Born on a world where war is the only language, the Tetramand is a siege engine wrapped in flesh. Four arms, each capable of leveling a building, driven by a warrior culture that knows no concept of surrender.",
    powers: ["Superhuman Strength", "Shockwave Clap", "Armored Skin"],
    color: "#DC143C",
    image: fourarms,
  },
  {
    id: 5,
    name: "UPGRADE",
    title: "The Living Machine",
    species: "Mechamorph",
    planet: "Galvan B",
    description:
      "A sentient nanotechnology organism that doesn't use machines — it becomes them. Born from an accident on Galvan Prime's moon, the Mechamorph absorbs, enhances, and weaponizes any technology it touches.",
    powers: ["Technopathy", "Body Morphing", "Energy Beams"],
    color: "#39FF14",
    image: upgrade,
  },
  {
    id: 6,
    name: "GHOSTFREAK",
    title: "The Nightmare",
    species: "Ectonurite",
    planet: "Anur Phaetos",
    description:
      "A consciousness that exists in the space between dimensions. The Ectonurite does not haunt — it unravels reality itself, phasing through matter and mind alike, leaving nothing but cold dread in its wake.",
    powers: ["Invisibility", "Intangibility", "Possession"],
    color: "#8B8BAE",
    image: ghostfreak,
  },
];
