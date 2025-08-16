import type {InferMetaType, InferPageType} from "fumadocs-core/source";

import {loader} from "fumadocs-core/source";

import {docs} from "@/.source";

import {createMetaIcon} from "./meta-icon";

// `loader()` also assign a URL to your pages
// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  baseUrl: "/docs",
  icon(icon) {
    return createMetaIcon(icon);
  },
  source: docs.toFumadocsSource(),
});

export type Page = InferPageType<typeof source>;
export type Meta = InferMetaType<typeof source>;
