import type {InferMetaType, InferPageType} from "fumadocs-core/source";

import {loader} from "fumadocs-core/source";

import {i18n} from "@/lib/i18n";

import {createMetaIcon} from "./meta-icon";

import {docs} from "@/.source";

// `loader()` also assign a URL to your pages
// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  baseUrl: "/docs",
  i18n,
  icon(icon) {
    return createMetaIcon(icon);
  },
  source: docs.toFumadocsSource(),
});

export type Page = InferPageType<typeof source>;
export type Meta = InferMetaType<typeof source>;
