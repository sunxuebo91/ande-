
#!/bin/bash

# 启动前端服务
echo "Starting frontend service..."
npm run dev &

# 启动后端服务
echo "Starting backend service..."
cd nest-backend && npm run start:dev &

echo "Both services are running in background."
echo "Use 'ps aux | grep node' to check running processes"
echo "Use 'killall node' to stop all services"
