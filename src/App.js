import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import AddressForm from "./components/AddressForm";
import AddressCard from "./components/AddressCard";
import DeliveryNavbar from "./components/Navbar";
import { getList, deleteItem, updateItem } from "./api/apiRequests";
import "bootstrap/dist/css/bootstrap.min.css";
import { getGeocodeURL } from "./api/apiBaseURLS";
const googleMapsApiKey = process.env.REACT_APP_GOOGLEMAPSAPIKEY;

function useGeolocation() {
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Seu navegador não suporta geolocalização.");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (error) => {
        setError(error.message);
      }
    );
  }

  return { position, error, getPosition };
}

export default function App() {
  const [addresses, setAddresses] = useState([]);
  const [streetName, setStreetName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [zipCodeMismatch, setZipCodeMismatch] = useState("");
  const [currentZipCode, setCurrentZipCode] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [currentState, setCurrentState] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [invalidCep, setInvalidCep] = useState(false);

  const {
    position: { lat, lng },
    error,
    getPosition,
  } = useGeolocation();

  const fetchAddresses = async () => {
    try {
      const items = await getList();
      setAddresses(items || []);
    } catch (error) {
      console.error("Falha ao buscar a lista de endereços:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  useEffect(() => {
    if (zipCodeMismatch) {
      setShowAlert(true);
      setShowForm(false);
    }
  }, [zipCodeMismatch]);

  const handlePositioning = async (zipCode) => {
    zipCode = zipCode.replace(/-/g, "");
    getPosition();
    setCurrentZipCode(zipCode);
    if (lat && lng) {
      const geocodeURL = getGeocodeURL(lat, lng, googleMapsApiKey);
      try {
        const response = await fetch(geocodeURL);
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        const addressComponents = data.results[0].address_components;
        const postalCode =
          addressComponents
            .filter((component) => component.types.includes("postal_code"))
            .map((component) => component.long_name)[0] || null;

        if (postalCode) {
          const viaCepURL = `https://viacep.com.br/ws/${zipCode}/json/`;
          const cepResponse = await fetch(viaCepURL);
          if (!cepResponse.ok)
            throw new Error(`HTTP error! Status: ${cepResponse.status}`);
          const cepData = await cepResponse.json();
          setStreetName(cepData.logradouro);
          setCurrentCity(cepData.localidade);
          setCurrentState(cepData.uf);
          if (postalCode !== cepData.cep) {
            setZipCodeMismatch(zipCode);
          } else {
            setZipCodeMismatch("");
          }
          setInvalidCep(false);
        }
      } catch (error) {
        setInvalidCep(true);
        console.error("Falha ao buscar dados de Geocode ou ViaCEP:", error);
      }
    }
  };

  const handleFormSubmit = async () => {
    fetchAddresses();
  };

  const handleUpdate = async (id, updates) => {
    try {
      await updateItem(
        id,
        updates.email,
        updates.name,
        updates.street,
        updates.zipCode,
        updates.city,
        updates.state,
        updates.complement
      );
      fetchAddresses();
    } catch (error) {
      console.error("Falha ao editar os dados de endereços:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address.id !== id)
      );
    } catch (error) {
      console.error(`Falha ao deletar o endereço com a ID: ${id}`, error);
    }
  };

  const handleAlertConfirm = () => {
    setShowAlert(false);
    setShowForm(true);
  };

  const handleAlertDismiss = () => {
    setShowAlert(false);
    setShowForm(true);
    setStreetName("");
    setZipCodeMismatch("");
    setCurrentZipCode("");
    setCurrentCity("");
    setCurrentState("");
  };

  return (
    <>
      <DeliveryNavbar />
      <Container className="mt-5">
        {showAlert && (
          <Alert variant="danger" dismissible>
            <Alert.Heading>
              Este endereço não bate com a sua localização atual
            </Alert.Heading>
            <p>Tem certeza que deseja continuar?</p>
            <Button
              variant="primary"
              onClick={handleAlertConfirm}
              className="me-2"
            >
              Sim
            </Button>
            <Button variant="secondary" onClick={handleAlertDismiss}>
              Não
            </Button>
          </Alert>
        )}
        {showForm && (
          <AddressForm
            onFormSubmit={handleFormSubmit}
            onPosition={handlePositioning}
            streetName={streetName}
            zipCode={currentZipCode}
            city={currentCity}
            state={currentState}
            invalidCep={invalidCep}
          />
        )}
        <h2 className="mb-4 text-center" style={{ marginTop: "3rem" }}>
          Endereços Cadastrados
        </h2>
        <Row className="d-flex flex-wrap gap-3 py-4">
          {addresses.map((address) => (
            <Col key={address.id} md={4} className="mb-3">
              <AddressCard
                id={address.id}
                email={address.email}
                name={address.address_name}
                street={address.street_name}
                zipCode={address.zip_code}
                city={address.city}
                state={address.state}
                complement={address.additional_address_data}
                onUpdate={(updates) => handleUpdate(address.id, updates)}
                onDelete={() => handleDelete(address.id)}
              />
            </Col>
          ))}
        </Row>
        {error && <p>Error: {error}</p>}
      </Container>
    </>
  );
}
