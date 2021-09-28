//Ejemplo
// const getProduct = () => {
//   // Get the token from the localStorage
//   const storedToken = localStorage.getItem('authToken')
//   // Send the token through the request "Authorization" Headers

//   axios
//     .get(
//       `${API_URL}/api/product/${_id}`,
//       { headers: { Authorization: `Bearer ${storedToken}` } },
//     )
//     .then((response) => setProduct(response.data))
//     .catch((error) => console.log(error))
// }
