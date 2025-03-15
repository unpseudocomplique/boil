export default defineEventHandler((event) => {
    const newRequestIncoming = getRequestURL(event)
    if(newRequestIncoming.pathname.includes('/api/')){
      console.info(`${event.method}: ${newRequestIncoming.pathname}`)
    }
  })