//Ejemplo
// const handleSubmit = (e) => {
//   e.preventDefault()
//   const requestBody = { name, description, price ... }
//   // Get the token from the localStorage

//   const storedToken = localStorage.getItem('authToken')

//   // Send the token through the request "Authorization" Headers

//   axios
//     .post(
//       `${API_URL}/api/product/${_id}`,
//       requestBody,

//       { headers: { Authorization: `Bearer ${storedToken}` } },
//     )

//     .then((response) => {
//       // Reset the state
//       setName('')
//       setDescription('')
//        ...
//       props.refreshProjects()
//     })
//     .catch((error) => console.log(error))
// }
