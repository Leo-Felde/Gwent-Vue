export function useWebSocket() {
  const socket = new WebSocket('ws://localhost:8080')

  socket.onmessage = async (event) => {
    const data = JSON.parse(event.data)

    switch (data.type) {
      case 'welcome':
        console.log('Bem vindo')
        break
    }
  }

  return {
    socket,
  }
}
