/**
 * Whether a search reads as a question for the docs agent rather than a page
 * to find: a question ("how do I…", "what's…", anything ending in "?") or a
 * request in a sentence ("I want to…", "show me…", "can you…"). Search lists
 * Ask AI first for these, since keyword hits rarely answer them.
 *
 * It reads only the first two words, so the answer holds while the rest is
 * typed, and it waits for the first word to end ("how " or "how's", not "how",
 * which could become "hover"), so rows don't trade places mid-word.
 */
export function readsAsQuestion(query: string): boolean {
  const text = query
    .toLowerCase()
    .replaceAll(/[‘’ʼ`]/gu, "'")
    .trimStart();

  if (text.trimEnd().endsWith("?")) return true;

  const [first = "", ...rest] = text.split(/\s+/u);
  const {isContraction, stem} = stemOf(first);
  const next = rest[0] ?? "";

  // A word is whole once something follows it, or once it's a contraction like "what's".
  if (!stem || (rest.length === 0 && !isContraction)) return false;
  if (QUESTION_WORDS.has(stem) || FIRST_PERSON.has(stem) || REQUESTS.has(stem)) return true;
  if (stem === "let" && isContraction) return true;
  if (ASKS_FOR_ME.has(stem)) return next === "me" || next === "us";

  // "Is there…", "can I…", "does it…": a verb asking about someone, not a title.
  return AUXILIARIES.has(stem) && SUBJECTS.has(next);
}

/** A word without its contraction: "what's" is "what", "don't" "do" and "can't" "can". */
function stemOf(word: string): {isContraction: boolean; stem: string} {
  const match = CONTRACTION.exec(word);

  if (!match?.[1]) return {isContraction: false, stem: word};

  return {isContraction: true, stem: IRREGULAR_STEMS[match[1]] ?? match[1]};
}

const CONTRACTION = /^(\p{L}+?)(?:n't|'s|'re|'d|'ll|'ve|'m)$/u;

/** "can't" and "won't" lose more than "n't". */
const IRREGULAR_STEMS: Record<string, string> = {ca: "can", wo: "will"};

const QUESTION_WORDS = new Set([
  "how",
  "hows",
  "what",
  "whats",
  "when",
  "where",
  "which",
  "who",
  "why",
]);

/** A sentence about yourself ("I want…", "I'm trying…"), which no page title starts with. */
const FIRST_PERSON = new Set(["i", "im", "ive"]);

/** Words that ask for something on their own. */
const REQUESTS = new Set(["explain", "lets", "please"]);

/** Verbs that ask for something once "me" follows: "show me", not "Show more". */
const ASKS_FOR_ME = new Set(["give", "help", "let", "show", "tell"]);

/** Verbs a yes or no question starts with. */
const AUXILIARIES = new Set(["are", "can", "could", "do", "does", "is", "should", "will", "would"]);

/** Who or what such a question is about. */
const SUBJECTS = new Set(["i", "it", "my", "there", "this", "we", "you"]);
