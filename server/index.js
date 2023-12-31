import { createServer } from "http";
import { Server } from "socket.io";

const generateRandomName = () => {
  const adjectives = ["Happy", "Funny", "Clever", "Silly", "Witty"];
  const nouns = ["Cat", "Dog", "Fish", "Bird", "Elephant"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adjective}${noun}`;
};

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? false
        : ["http://localhost:5500", "http://127.0.0.1:5500"],
  },
});

io.on("connection", (socket) => {
  const randomName = generateRandomName();
  console.log(`User ${randomName} (${socket.id}) connected`);

  socket.on("message", (data) => {
    console.log(data);
    io.emit("message", `${randomName}: ${data}`);
  });
});

httpServer.listen(3500, () => console.log("listening on port 3500"));
