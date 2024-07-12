import apiBaseURL from "./apiBaseURLS.js";

/*
  --------------------------------------------------------------------------------------
  GET REQUEST: Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  const url = `${apiBaseURL}/item`;
  console.log(url);
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

/*
  --------------------------------------------------------------------------------------
  POST REQUEST: Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (
  inputAdressName,
  inputEmail,
  inputZipCode,
  inputStreetName,
  inputCity,
  inputState,
  inputAdicionalAdressData
) => {
  const itemData = {
    address_name: inputAdressName,
    email: inputEmail,
    zip_code: inputZipCode,
    street_name: inputStreetName,
    city: inputCity,
    state: inputState,
    additional_address_data: inputAdicionalAdressData,
  };

  const jsonData = JSON.stringify(itemData);
  console.log(jsonData);

  const url = `${apiBaseURL}/item`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

/*
  --------------------------------------------------------------------------------------
  PUT REQUEST: Função para modificar um item na lista do servidor via requisição PUT
  --------------------------------------------------------------------------------------
*/
const updateItem = async (
  itemId,
  email,
  name,
  street,
  zipCode,
  city,
  state,
  complement
) => {
  const itemData = {
    address_name: name,
    email: email,
    street_name: street,
    zip_code: zipCode,
    city: city,
    state: state,
    additional_address_data: complement,
  };

  const jsonData = JSON.stringify(itemData);
  console.log(jsonData);
  const url = `${apiBaseURL}/item/${itemId}`;
  console.log(url);

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to update item:", error);
    throw error;
  }
};

/*
  --------------------------------------------------------------------------------------
  DELETE REQUEST: Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = async (itemId) => {
  const url = `${apiBaseURL}/item/${itemId}`;
  console.log(url);

  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to delete the item with ID: ${itemId}`, error);
    throw error;
  }
};

export { getList, postItem, updateItem, deleteItem };
