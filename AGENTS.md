# Local Browser Safety

- Do not use the Chrome plugin or the user's Google Chrome browser in Codex sessions.
- For browser automation, use the Codex in-app Browser backend only (`iab`).
- Do not launch localhost, file, preview, or visual-companion URLs in an external browser.
- Do not use Superpowers visual companion flows that require opening a local URL unless the user explicitly approves external browser use for that specific turn.
- If in-app Browser setup fails, use non-browser checks such as `curl`, DOM/static inspection, or ask before opening any GUI browser.
