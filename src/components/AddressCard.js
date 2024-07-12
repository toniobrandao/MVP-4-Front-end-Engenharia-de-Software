import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { updateItem } from "../api/apiRequests";

const AddressCard = ({
  id,
  email,
  name,
  street,
  zipCode,
  city,
  state,
  complement,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editStreet, setEditStreet] = useState(street);
  const [editZipCode, setEditZipCode] = useState(zipCode);
  const [editCity, setEditCity] = useState(city);
  const [editState, setEditState] = useState(state);
  const [editComplement, setEditComplement] = useState(complement);

  const handleUpdate = async () => {
    try {
      await updateItem(
        id,
        email,
        editName,
        editStreet,
        editZipCode,
        editCity,
        editState,
        editComplement
      );
      setIsEditing(false);
      if (onUpdate)
        onUpdate({
          email,
          name: editName,
          street: editStreet,
          zipCode: editZipCode,
          city: editCity,
          state: editState,
          complement: editComplement,
        });
    } catch (error) {
      console.error("Failed to update the address:", error);
    }
  };

  return (
    <Card className="p-2" style={{ width: "18rem" }}>
      <Card.Body>
        {isEditing ? (
          <Form>
            <Form.Group className="mb-3" controlId="formAddressName">
              <Form.Label>Nome do Endereço</Form.Label>
              <Form.Control
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStreetName">
              <Form.Label>Rua</Form.Label>
              <Form.Control
                type="text"
                value={editStreet}
                onChange={(e) => setEditStreet(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formZipCode">
              <Form.Label>CEP</Form.Label>
              <Form.Control
                type="text"
                value={editZipCode}
                onChange={(e) => setEditZipCode(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCity">
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                type="text"
                value={editCity}
                onChange={(e) => setEditCity(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formState">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                value={editState}
                onChange={(e) => setEditState(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAdicionalAdressData">
              <Form.Label>Complemento</Form.Label>
              <Form.Control
                type="text"
                value={editComplement}
                onChange={(e) => setEditComplement(e.target.value)}
              />
            </Form.Group>

            <Button variant="success" onClick={handleUpdate} className="me-2">
              Salvar
            </Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Cancelar
            </Button>
          </Form>
        ) : (
          <>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              <strong>Rua:</strong> {street} <br />
              <strong>CEP:</strong> {zipCode} <br />
              <strong>Cidade:</strong> {city} <br />
              <strong>Estado:</strong> {state} <br />
              <strong>Complemento:</strong> {complement}
            </Card.Text>
            <div className="d-flex justify-content-between">
              <Button variant="primary" onClick={() => setIsEditing(true)}>
                Editar
              </Button>
              <Button variant="danger" onClick={() => onDelete()}>
                Excluir
              </Button>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default AddressCard;
