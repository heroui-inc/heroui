"use client";

import {useEffect, useLayoutEffect} from "react";

export const useSafeLayoutEffect = globalThis?.document ? useLayoutEffect : useEffect;
