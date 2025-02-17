import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ruLocale from "date-fns/locale/ru";
import format from "date-fns/format";
import axios from "axios";

const Content = ({ searchQuery }) => {
  const [date, setDate] = React.useState(new Date());
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [count, setCount] = useState(5);

  const fetchNews = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:4444/news");
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "text/xml");
      const items = xmlDoc.getElementsByTagName("item");
      const newsItems = Array.from(items).map((item) => ({
        title: item.getElementsByTagName("title")[0].textContent,
        date: item.getElementsByTagName("date")[0].textContent,
        description: item.getElementsByTagName("description")[0].textContent,
        image: item.getElementsByTagName("image")[0].textContent,
      }));
      setNews(newsItems);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:4444/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchNews();
    fetchEvents();
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 5);
      fetchNews();
    }, 15000);
    return () => clearInterval(interval);
  }, [count]);

  const isValidDate = (date) => {
    return !isNaN(Date.parse(date));
  };

  const formatDate = (dateString) => {
    if (isValidDate(dateString)) {
      const date = new Date(dateString);
      return format(date, "dd.MM.yyyy");
    } else {
      return "Invalid date";
    }
  };

  const filterData = (data) => {
    const searchWords = searchQuery.toLowerCase().split(" ");

    return data.filter((item) => {
      const itemValues = Object.values(item).join(" ").toLowerCase();
      return searchWords.every((word) => itemValues.includes(word));
    });
  };

  const generateICS = (event) => {
    const uid = Date.now();
    const dtstamp = format(new Date(), "yyyyMMdd'T'HHmmss'Z'");
    const dtstart = format(new Date(event.date), "yyyyMMdd'T'HHmmss'Z'");
    const dtend = format(new Date(event.date), "yyyyMMdd'T'HHmmss'Z'");

    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DTSTART:${dtstart}
DTEND:${dtend}
DTSTAMP:${dtstamp}
UID:${uid}
DESCRIPTION:${event.description}
LOCATION:
ORGANIZER:${event.author}
STATUS:CONFIRMED
PRIORITY:0
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.title}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredNews = filterData(news);
  const filteredEvents = filterData(events);

  return (
    <Container sx={{ marginTop: 3 }} maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Календарь событий
          </Typography>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={ruLocale}
          >
            <DateCalendar value={date} onChange={setDate} />
          </LocalizationProvider>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ marginTop: 3 }}
          >
            События
          </Typography>
          <Grid container spacing={2}>
            {filteredEvents.length ? (
              filteredEvents.map((event, index) => (
                <Grid item xs={12} key={index}>
                  <Card sx={{ backgroundColor: "#88b04b" }}>
                    <CardContent sx={{ color: "white" }}>
                      <Typography variant="body1" fontWeight="bold">
                        {event.title}
                      </Typography>
                      <Typography variant="body2">
                        {event.description}
                      </Typography>
                      <Box display="flex" justifyContent="space-between">
                        <Box display="flex" gap="10px">
                          <Button
                            variant="text"
                            onClick={() => generateICS(event)}
                          >
                            Календарь
                          </Button>
                          <Typography variant="caption">
                            {formatDate(event.date)}
                          </Typography>
                        </Box>
                        <Typography variant="caption" fontWeight="bold">
                          {event.author}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography>Не найдено событий</Typography>
            )}
          </Grid>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Новости
          </Typography>
          <Grid container spacing={2}>
            {filteredNews.length ? (
              filteredNews.map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card
                    sx={{
                      display: "flex",
                      color: "white",
                      flexDirection: "column",
                      height: 300,
                      backgroundColor: "#88b04b",
                    }}
                  >
                    <CardContent sx={{ flex: 1 }}>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{
                            height: "137px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                      )}
                      <Typography variant="body1" fontWeight="bold">
                        {item.title}
                      </Typography>
                      <Typography variant="body2">
                        {item.description}
                      </Typography>
                      <Typography variant="body2">
                        {isValidDate(item.date)
                          ? formatDate(item.date)
                          : "Invalid date"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography>Не найдено новостей</Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Content;
