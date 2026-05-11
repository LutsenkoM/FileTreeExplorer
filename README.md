# FileTree Explorer

Frontend-only React application for loading, validating, searching, and navigating a JSON-based file tree.

## Run locally

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` starts the development server.
- `npm run build` runs TypeScript build and creates a production bundle.
- `npm run lint` runs ESLint.
- `npm test` runs unit tests.
- `npm run check` runs lint and tests.
- `npm run check:full` runs lint, tests, and production build.

## Git hooks

Husky is configured to keep commits and pushes safe:

- `pre-commit` runs `npm run check`.
- `pre-push` runs `npm run check:full`.

## Architecture decisions

- The app is frontend-only and stores the active tree in `localStorage`.
- JSON parsing, tree validation, tree traversal, path handling, search, and size formatting are implemented as pure utilities.
- The tree uses path-based selection: `selectedPath` is the source of truth, while the selected node is derived with `findNodeByPath`.
- Internal node paths include the root segment, for example `root/src/index.ts`. The same shape is used in details URLs like `/tree/root/src/index.ts` because `/tree` is already the main tree view route, while `/tree/root` represents the standalone details page for the root node.
- Tree page state is scoped to `TreeExplorerProvider`, avoiding global state libraries for this small feature scope.
- Details UI is split into reusable presentational components so the same file/folder details can be used in the right panel and on the standalone details route.
- Search state is persisted in the URL query param, so search survives page refresh and can be shared.
- Unit tests cover validation, storage, path handling, size calculation, formatting, and search behavior.

## With more time

- Support multiple uploaded JSON files and allow switching between saved trees.
- Add create, rename, edit, and delete actions for folders and files.
- Add file content editing for nodes that contain the optional `content` field.
- Export the modified tree back to a JSON file.
- Add richer keyboard navigation for the tree.
- Add an error boundary for route-level runtime failures.
- Improve large-tree performance with virtualization if very large JSON files become a target use case.

## Known limitations

- Only one active tree is stored at a time.
- Tree data is persisted in `localStorage`, so storage capacity is browser-limited.
- The app does not edit or export JSON yet.
- Search is name-based only and does not search inside file content.
- The UI assumes valid unique paths based on node names within each folder.
