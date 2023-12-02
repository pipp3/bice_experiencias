import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Typography,
  Slider,
} from "@mui/material";

const marks = [
  { value: 1, label: "Totalmente en desacuerdo" },
  { value: 2 },
  { value: 3, label: "Indiferente" },
  { value: 4 },
  { value: 5, label: "Totalmente de acuerdo" },
];

const CrearEncuesta = () => {
  const [value, setValue] = useState(3); // Default value (Indiferente)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [nombreEncuesta, setNombreEncuesta] = useState("");
  const [preguntas, setPreguntas] = useState([]);
  const [tipoPregunta, setTipoPregunta] = useState("abierta");
  const [nuevaPregunta, setNuevaPregunta] = useState("");

  const agregarPregunta = () => {
    if (nuevaPregunta.trim() !== "") {
      setPreguntas([
        ...preguntas,
        { tipo: tipoPregunta, texto: nuevaPregunta },
      ]);
      setNuevaPregunta("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar las preguntas y el nombre de la encuesta a tu API o realizar la lógica necesaria.
    console.log("Encuesta:", { nombreEncuesta, preguntas });
  };

  return (
    <Container
      className="md:3/5 lg:w-3/5 bg-white shadow rounded-md px-10 py-5 mt-5"
      component="main"
      maxWidth="xs"
    >
      <h1 className="text-sky-600 font-black text-4xl capitalize mt-3">
        Crea tus
      </h1>
      <h3 className="text-gray-400 text-xl font-black">
        {" "}
        Encuestas y mejora
        <span className="text-sky-500"> el ambiente laboral!!!</span>
      </h3>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="nombreEncuesta"
          label="Nombre de la Encuesta"
          name="nombreEncuesta"
          value={nombreEncuesta}
          onChange={(e) => setNombreEncuesta(e.target.value)}
        />

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="tipoPregunta-label">Tipo de Pregunta</InputLabel>
          <Select
            labelId="tipoPregunta-label"
            id="tipoPregunta"
            value={tipoPregunta}
            onChange={(e) => setTipoPregunta(e.target.value)}
            label="Tipo de Pregunta"
          >
            <MenuItem value="abierta">Pregunta Abierta</MenuItem>
            <MenuItem value="barra">
              Pregunta con Barra de Desplazamiento
            </MenuItem>
            <MenuItem value="alternativas">Pregunta de Alternativas</MenuItem>
          </Select>
        </FormControl>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="nuevaPregunta"
          label="Texto de la Pregunta"
          name="nuevaPregunta"
          value={nuevaPregunta}
          onChange={(e) => setNuevaPregunta(e.target.value)}
        />

        {tipoPregunta === "barra" && (
          <div className="w-300 m-1">
            <Slider
              className="px-5"
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              step={1}
              marks={marks}
              min={1}
              max={5}
            />
          </div>
        )}
        {tipoPregunta === "alternativas" && (
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="alternativa1"
              label="Alternativa 1"
              name="alternativa1"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="alternativa2"
              label="Alternativa 2"
              name="alternativa2"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="alternativa3"
              label="Alternativa 3"
              name="alternativa3"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="alternativa4"
              label="Alternativa 4"
              name="alternativa4"
            />
          </div>
        )}

        <input
          type="submit"
          value="Añadir Pregunta"
          className="bg-sky-700 text-white w-full py-3 mt-5 font-bold rounded-md uppercase hover:cursor-pointer hover:bg-sky-900 transition-colors"
        />

        <div className="mt-4 mb-10">
          <h6 className="text-sky-600 font-black text-2xl capitalize mt-3">
            Preguntas agregadas:
          </h6>
          <ul>
            {preguntas.map((pregunta, index) => (
              <li key={index}>{`${pregunta.tipo}: ${pregunta.texto}`}</li>
            ))}
          </ul>
        </div>

        <input
          type="submit"
          value="Crear Encuesta"
          className="bg-sky-700 text-white w-full py-3 mt-5 font-bold rounded-md uppercase hover:cursor-pointer hover:bg-sky-900 transition-colors"
        />
      </form>
    </Container>
  );
};

export default CrearEncuesta;
