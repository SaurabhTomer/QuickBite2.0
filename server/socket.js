import User from "./models/user.model.js"

export const socketHandler = (io) => {
  // Run when a new client connects
  io.on('connection', (socket) => {
    console.log(socket.id) // Log socket id

    // Save user socket id when user identifies
    socket.on('identity', async ({ userId }) => {
      try {
        await User.findByIdAndUpdate(
          userId,
          {
            socketId: socket.id, // store socket id
            isOnline: true        // mark user online
          },
          { new: true }
        )
      } catch (error) {
        console.log(error)
      }
    })

    //update location of delivery boy real time
        socket.on('updateLocation', async ({ latitude, longitude, userId }) => {
      try {
        const user = await User.findByIdAndUpdate(userId, {
          location: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          isOnline: true,
          socketId: socket.id
        })

        if (user) {
          io.emit('updateDeliveryLocation',{
            deliveryBoyId:userId,
            latitude,
            longitude
          })
        }


      } catch (error) {
          console.log('updateDeliveryLocation error')
      }
    })


    // Run when client disconnects
    socket.on('disconnect', async () => {
      try {
        await User.findOneAndUpdate(
          { socketId: socket.id }, // find user by socket
          {
            socketId: null,        // remove socket id
            isOnline: false        // mark user offline
          }
        )
      } catch (error) {
        console.log(error)
      }
    })
  })
}
