const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");
const commentRoutes = require("./routes/commentRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const workingCalendarRoutes = require("./routes/workingCalendar");
const departmentRoutes = require("./routes/departmentRoutes");
const positionRoutes = require("./routes/positionRoutes");
const eventRoutes = require("./routes/eventRoutes");
const { faker } = require("@faker-js/faker");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

let news = [];

const generateRandomNews = () => {
  return {
    title: faker.lorem.sentence(),
    pubDate: faker.date.recent().toISOString(),
    contentSnippet: faker.lorem.paragraph(),
    enclosure: {
      url: faker.image.url(),
    },
  };
};

setInterval(() => {
  const newArticle = generateRandomNews();
  news.push(newArticle);
  console.log(`Generated news: ${newArticle.title}`);
}, 15000);

app.get("/news", (req, res) => {
  const count = parseInt(req.query.count, 10) || news.length;
  res.json(news.slice(0, count));
});

app.use("/api/v1", authRoutes);
app.use("/api/v1", documentRoutes);
app.use("/api/v1", commentRoutes);
app.use("/api/v1", employeeRoutes);
app.use("/api/v1/workingcalendar", workingCalendarRoutes);
app.use("/api/v1/", departmentRoutes);
app.use("/api/v1/", positionRoutes);
app.use("/api/v1/", eventRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
