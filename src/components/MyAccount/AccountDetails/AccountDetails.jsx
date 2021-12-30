import { useContext, useState, useEffect } from 'react'
import { Form, Row, Col, Button, Container } from 'react-bootstrap'

import { AuthContext } from '../../../common/context/Auth.context'
import axiosInstance from '../../../common/http'
import Swal from 'sweetalert2/src/sweetalert2'
import './AccountDetails.css'

const AccountDetails = () => {
  const { user, setUser } = useContext(AuthContext)
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})

  const storedToken = localStorage.getItem('authToken')

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    })

    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      })
  }

  const findFormErrors = () => {
    const { username, email, password, rePassword } = form

    const emailRegex = new RegExp(/^\S+@\S+\.\S+$/)
    const passwordRegex = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/)
    const newErrors = {}

    // username errors
    if (!username || username === '')
      newErrors.username = 'This field cannot be blank.'
    else if (username.length < 2)
      newErrors.username = 'Userame cannot be less than 2 characters long.'
    else if (username.length > 20)
      newErrors.username = 'Username cannot be more than 20 characters long.'

    // email errors
    if (!email || email === '') newErrors.email = 'This field cannot be blank.'
    else if (!emailRegex.test(email))
      newErrors.email = 'Please provide a valid email address.'

    // password errors
    if (password !== rePassword) newErrors.password = 'Passwords do not match'
    else if (password && !passwordRegex.test(password))
      newErrors.password =
        'Password must be 6 characters long and have one number, one lowercase and one uppercase letter.'

    // rePassword errors
    if (password !== rePassword) newErrors.rePassword = 'Passwords do not match'

    return newErrors
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = findFormErrors()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      if (!form.password) delete form.password
      const body = { ...form }

      axiosInstance
        .patch(`/api/users/${user._id}`, body, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setUser(response.data.user)
          Swal.fire({
            icon: 'success',
            text: 'Account details edited successfully',
            showConfirmButton: false,
          })
        })
        .catch((err) => {
          console.log(err.message)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        })
    }
  }

  useEffect(() => {
    axiosInstance(`/api/users/${user._id}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((response) => {
        const foundUser = response.data
        setForm({
          name: foundUser.name,
          surname: foundUser.surname,
          username: foundUser.username,
          phone: foundUser.phone,
          email: foundUser.email,
          password: foundUser.password,
          rePassword: foundUser.rePassword,
        })
      })
      .catch((err) => {
        console.log(err)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container
      id="account-details"
      className="d-flex flex-column justify-content-center align-items-center"
    >
    <h3 className="text-center text-muted text-uppercase ">Edit personal details</h3>
      <div className="col-sm-12 col-md-6 ">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col xs={12} sm={6} lg={6}>
              <Form.Group as={Col}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setField('name', e.target.value)}
                  value={form.name || ''}
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} lg={6}>
              <Form.Group as={Col}>
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setField('surname', e.target.value)}
                  value={form.surname || ''}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12} sm={6} lg={6}>
              <Form.Group as={Col}>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setField('username', e.target.value)}
                  value={form.username || ''}
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} lg={6}>
              <Form.Group as={Col}>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setField('phone', e.target.value)}
                  value={form.phone || ''}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setField('email', e.target.value)}
                isInvalid={!!errors.email}
                value={form.email || ''}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Col xs={12} sm={6} lg={6}>
              <Form.Group as={Col}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setField('password', e.target.value)}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} lg={6}>
              <Form.Group as={Col}>
                <Form.Label>Repeat password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setField('rePassword', e.target.value)}
                  isInvalid={!!errors.rePassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.rePassword}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Col xs={12} sm={6} lg={6}>
            <Button variant="outline-success" type="submit">
              Submit changes
            </Button>
          </Col>
        </Form>
      </div>
    </Container>
  )
}

export default AccountDetails
