import { App, createApp } from 'vue'
import Notification from '@/components/Notification.vue'

const notificationPlugin = {
  install(app: App) {
    const showNotification = (
      type: string,
      duration = 1000,
      message: string | null = null
    ) => {
      return new Promise<void>((resolve) => {
        // Padding de tempo para transição
        const transitionTime = 200
        const totalDuration = duration + transitionTime

        const notificationInstance = createApp(Notification, {
          type,
          duration,
          message,
        })

        const mountPoint = document.createElement('div')
        document.body.appendChild(mountPoint)
        notificationInstance.mount(mountPoint)

        setTimeout(() => {
          notificationInstance.unmount()
          document.body.removeChild(mountPoint)
          resolve()
        }, totalDuration)
      })
    }

    app.provide('notification', showNotification)
  },
}

export default notificationPlugin
