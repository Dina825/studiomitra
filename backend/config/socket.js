const http = require("http");
const socketIO = require("socket.io");
const { SOCKET_PORT } = require("./app.js");

/**
 * Initialize socket.io
 *
 * @type {socketIO.Server | undefined}
 */
let io;

const initSocketServer = function (app) {
	const server = http.createServer(app);

	// Setup socket.io
	io = new socketIO.Server(server, {
		cors: {
			origin: "*",
		},
	});

	io.on("connection", (socket) => {
		const userId = socket.handshake.auth.user_id;

		// Notify other users that a user is online
		console.log("Socket: a user connected");
		socket.broadcast.emit("users:status-updated", {
			user_id: userId,
			online: true,
		});

		// Notify other users that a user is offline
		socket.on("disconnect", () => {
			console.log("Socket: user disconnected");
			socket.broadcast.emit("users:status-updated", {
				user_id: userId,
				online: false,
			});
		});

		// Join news chat room
		socket.on("join-news-room", (data) => {
			socket.rooms.forEach((room) => {
				socket.leave(room);
			});
			socket.join(data.news_id);

			io.to(data.news_id).emit("users:status-updated", {
				user_id: userId,
				online: true,
			});
		});
		socket.on("disconnecting", () => {
			socket.rooms.forEach((room) => {
				io.to(room).emit("users:status-updated", {
					user_id: userId,
					online: false,
				});
			});
		});
	});

	server.listen(SOCKET_PORT, () => {
		console.log(`Listening on *:` + SOCKET_PORT);
	});
};

const getSocketIO = function () {
	return io;
};

module.exports = {
	initSocketServer,
	getSocketIO,
};
