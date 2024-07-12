import React, { useState, useEffect } from "react";
import { Form, Button, Container, Card, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { postItem } from "../api/apiRequests";

const AddressForm = ({
  onFormSubmit,
  onPosition,
  streetName,
  zipCode,
  invalidCep,
  city,
  state,
}) => {
  const [addressName, setAddressName] = useState("");
  const [email, setEmail] = useState("");
  const [zipCodeState, setZipCodeState] = useState(zipCode || "");
  const [streetNameState, setStreetNameState] = useState(streetName || "");
  const [cityState, setCityState] = useState(city || "");
  const [stateState, setStateState] = useState(state || "");
  const [adicionalAdressData, setAdicionalAdressData] = useState("");

  useEffect(() => {
    setStreetNameState(streetName);
  }, [streetName]);

  useEffect(() => {
    setZipCodeState(zipCode);
  }, [zipCode]);

  useEffect(() => {
    setCityState(city);
  }, [city]);

  useEffect(() => {
    setStateState(state);
  }, [state]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await postItem(
        addressName,
        email,
        zipCodeState,
        streetNameState,
        cityState,
        stateState,
        adicionalAdressData
      );
      setAddressName("");
      setEmail("");
      setZipCodeState("");
      setStreetNameState("");
      setCityState("");
      setStateState("");
      setAdicionalAdressData("");
      onFormSubmit();
    } catch (error) {
      console.error("Failed to submit the address:", error);
    }
  };

  return (
    <Container>
      <Card className="my-4">
        <Card.Header as="h5">Cadastrar Novo Endereço</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formAddressName">
              <Form.Label>Nome do Endereço</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome do Endereço"
                value={addressName}
                onChange={(e) => setAddressName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Seu Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formZipCode">
              <Form.Label>CEP</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="CEP"
                  value={zipCodeState}
                  onChange={(e) => setZipCodeState(e.target.value)}
                  required
                />
                <Button
                  variant="primary"
                  onClick={() => onPosition(zipCodeState)}
                >
                  Pegar meu endereço
                </Button>
              </InputGroup>
              {invalidCep && (
                <Form.Text className="text-danger">CEP inválido</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStreetName">
              <Form.Label>Rua</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome da Rua"
                value={streetNameState}
                onChange={(e) => setStreetNameState(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCity">
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                type="text"
                placeholder="Cidade"
                value={cityState}
                onChange={(e) => setCityState(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formState">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                placeholder="Estado"
                value={stateState}
                onChange={(e) => setStateState(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAdicionalAdressData">
              <Form.Label>Complemento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Complemento"
                value={adicionalAdressData}
                onChange={(e) => setAdicionalAdressData(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddressForm;
