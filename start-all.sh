
#!/bin/bash
npx concurrently "cd nest-backend && npm run start:dev" "npm run dev"
