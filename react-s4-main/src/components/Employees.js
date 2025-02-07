import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { QRCodeCanvas } from "qrcode.react";

const Employees = ({ searchQuery }) => {
  const [employees, setEmployees] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/employees/"
        );
        setEmployees(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchPositions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/positions/"
        );
        setPositions(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEmployees();
    fetchPositions();
  }, []);

  const getPositionName = (positionId) => {
    const position = positions.find((pos) => pos.id === positionId);
    return position ? position.name : "Unknown Position";
  };

  const filterEmployees = (employees) => {
    const searchWords = searchQuery.toLowerCase().split(" ");

    return employees.filter((employee) => {
      const employeeValues = Object.values(employee).join(" ").toLowerCase();
      const positionName = getPositionName(employee.position_id).toLowerCase();

      return searchWords.every(
        (word) => employeeValues.includes(word) || positionName.includes(word)
      );
    });
  };

  const filteredEmployees = filterEmployees(employees);

  const handleQRCodeOpen = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleQRCodeClose = () => {
    setSelectedEmployee(null);
  };

  const generateVCard = (employee) => {
    return `
BEGIN:VCARD
VERSION:3.0
N:${employee.last_name};${employee.first_name};;;
FN:${employee.first_name} ${employee.last_name}
ORG:ГК Дороги России
TITLE:${getPositionName(employee.position_id)}
TEL;WORK;VOICE:${employee.personal_number}
EMAIL;WORK;INTERNET:${employee.email}
END:VCARD
    `;
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Container sx={{ marginTop: 3 }} maxWidth={"xl"}>
      <Typography variant="h5" component="div" mb={"20px"}>
        Сотрудники
      </Typography>
      <Grid
        container
        spacing={2}
        direction="row"
        wrap="nowrap"
        sx={{ overflowX: "auto" }}
      >
        {filteredEmployees.length ? (
          filteredEmployees.map((employee) => (
            <Grid item xs={12} sm={3} md={3} key={employee.id}>
              <Card sx={{ background: "#88b04b", color: "white" }}>
                <CardContent>
                  <Typography variant="h5" component="div" color="white">
                    {employee.last_name} {employee.first_name}{" "}
                    {employee.middle_name}
                  </Typography>
                  <Typography variant="body2" color="white">
                    {getPositionName(employee.position_id)}
                  </Typography>
                  <Typography variant="body2" color="white">
                    {employee.email}
                  </Typography>
                  <Typography variant="body2" color="white">
                    {employee.personal_number}
                  </Typography>
                  <Typography variant="body2" color="white">
                    {new Date(employee.birth_date).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                    })}
                  </Typography>
                  <Button
                    variant="text"
                    onClick={() => handleQRCodeOpen(employee)}
                  >
                    Показать QR-код
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>Не найдено сотрудников</Typography>
        )}
      </Grid>
      <Dialog open={!!selectedEmployee} onClose={handleQRCodeClose}>
        <DialogTitle>QR-код контакта</DialogTitle>
        <DialogContent>
          {selectedEmployee && (
            <QRCodeCanvas value={generateVCard(selectedEmployee)} />
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Employees;
