"use client";

import React from "react";
import { motion as framerMotion } from "framer-motion";

const MotionDiv = framerMotion.div;
const MotionButton = framerMotion.button;
const MotionSpan = framerMotion.span;
const MotionP = framerMotion.p;
const MotionH1 = framerMotion.h1;
const MotionH2 = framerMotion.h2;
const MotionH3 = framerMotion.h3;
const MotionH4 = framerMotion.h4;
const MotionUl = framerMotion.ul;
const MotionLi = framerMotion.li;
const MotionA = framerMotion.a;

export const motion = {
  div: MotionDiv,
  button: MotionButton,
  span: MotionSpan,
  p: MotionP,
  h1: MotionH1,
  h2: MotionH2,
  h3: MotionH3,
  h4: MotionH4,
  ul: MotionUl,
  li: MotionLi,
  a: MotionA,
};