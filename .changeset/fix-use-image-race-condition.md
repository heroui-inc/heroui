---
"@heroui/use-image": patch
"@heroui/image": patch
"@heroui/avatar": patch
---

Fix race condition in use-image hook that caused cached images to remain invisible (stuck at opacity-0) on Firefox and Safari.

**Root Cause:**
Event handlers (`onload`/`onerror`) were attached AFTER setting the image `src`. For cached images, the browser fires `onload` synchronously when `src` is set, causing the event to be missed. This is particularly prevalent in Firefox and Safari due to their JavaScript execution timing characteristics.

**Solution:**
- Attach `onload`/`onerror` handlers BEFORE setting `src`
- Check both `naturalWidth` AND `naturalHeight` (per CodeRabbit review feedback on #4523)
- Handle synchronous error callbacks for failed cached images
- Include `ignoreFallback` in useCallback dependencies to prevent stale closures when prop changes dynamically
- Add comprehensive test coverage including synchronous callback scenarios and dynamic `ignoreFallback` changes

Fixes #4534, #2259
