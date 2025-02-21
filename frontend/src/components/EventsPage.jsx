import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import utc from "dayjs/plugin/utc"; // Importa o plugin
import timezone from "dayjs/plugin/timezone";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  Typography,
  Card,
  CardMedia,
  CircularProgress,
  Box,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    event_name: "",
    event_date_time: "",
    city: "",
    state: "",
    address: "",
    number: "",
    complement: "",
    phone: "",
    image: "",
  });

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/event/",{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
      });
      setEvents(response.data.results);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeDate = (newValue) => {
    setFormData({
      ...formData,
      event_date_time: newValue ? dayjs(newValue).format("YYYY-MM-DDTHH:mm:ss") : "",
    });
  };
  
  

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  dayjs.extend(utc);
  dayjs.extend(timezone);

  const handleSubmit = async () => {
    try {
      let formattedDate = formData.event_date_time;
  
      if (dayjs(formattedDate).isValid()) {
        formattedDate = dayjs(formData.event_date_time)        
        .tz("America/Sao_Paulo")
        .format("YYYY-MM-DD HH:mm:ss"); 
      } else {
        formattedDate = ""; 
      }
  
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "image" && formData[key]) {
          form.append(key, formData[key]);
        } else if (key === "event_date_time") {
          form.append(key, formattedDate);
        } else {
          form.append(key, formData[key]);
        }
      });
  
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "multipart/form-data",
      };
  
      if (selectedEvent) {
        await axios.put(
          `http://localhost:8000/api/event/${selectedEvent.id}/`,
          form,
          { headers }
        );
      } else {
        await axios.post("http://localhost:8000/api/event/", form, { headers });
      }
  
      setOpen(false);
      fetchEvents();
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
    }
  };
  
  
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/event/${selectedEvent.id}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setOpenDelete(false);
      fetchEvents();
    } catch (error) {
      console.error("Erro ao excluir evento:", error);
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setFormData({
      event_name: event.event_name,
      event_date_time: event.event_date_time
      ? dayjs(event.event_date_time, "DD/MM/YYYY - HH:mm")
      : null,
      city: event.city,
      state: event.state,
      address: event.address,
      number: event.number,
      complement: event.complement,
      phone: event.phone,
      image: "",
    });
    setOpen(true);
};

  
  

  const handleConfirmDelete = (event) => {
    setSelectedEvent(event);
    setOpenDelete(true);
  };

  const resetForm = () => {
    setFormData({
      event_name: "",
      event_date_time: "",
      city: "",
      state: "",
      address: "",
      number: "",
      complement: "",
      phone: "",
      image: "",
    });
    setSelectedEvent(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <div style={{ padding: "20px" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          resetForm();
          setOpen(true);
        }}
      >
        Adicionar Evento
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => {
          localStorage.removeItem("access_token");
          window.location.href = "/";
        }}
      >
        Sair
      </Button>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Data e Hora</TableCell>
              <TableCell>Cidade</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Imagem</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events?.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.event_name}</TableCell>
                <TableCell>{event.event_date_time}</TableCell>
                <TableCell>{event.city}</TableCell>
                <TableCell>{event.state}</TableCell>
                <TableCell>{event.phone}</TableCell>
                <TableCell>
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.event_name}
                      style={{
                        width: "100px",
                        height: "100px",
                      }}
                    />
                  ) : (
                    <span>Sem imagem</span>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(event)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleConfirmDelete(event)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {selectedEvent ? "Editar Evento" : "Adicionar Evento"}
        </DialogTitle>
        <DialogContent>
          {Object.keys(formData).map((field) => {
            if (field === "event_date_time") {
              return (
                <DateTimePicker
                  key="event_date_time"
                  margin="dense"
                  label="Data e Hora"
                  name="event_date_time"
                  value={formData.event_date_time ? dayjs(formData.event_date_time) : null}
                  onChange={handleChangeDate}
                  fullWidth
                />
              );
            }
            if (field === "image") {
              return (
                <div key={field} style={{ margin: "8px 0" }}>
                  <input
                    type="file"
                    name={field}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                    accept="image/*"
                  />
                  <Button
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    onClick={() => fileInputRef.current.click()}
                    fullWidth
                  >
                    {formData.image ? formData.image.name : "Selecionar imagem"}
                  </Button>
                </div>
              );
            }
            return (
              <TextField
                key={field}
                margin="dense"
                label={field.replace("_", " ").toUpperCase()}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                fullWidth
              />
            );
          })}
          {selectedEvent &&
            (selectedEvent.image ? (
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={selectedEvent.image}
                  title={selectedEvent.event_name}
                  borderRadius="8px"
                />
              </Card>
            ) : (
              ""
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSubmit} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Excluir Evento</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza de que deseja excluir este evento?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancelar</Button>
          <Button onClick={handleDelete} color="error">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Events;
