import { useEffect, useState } from 'react'
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js'
import { Button, Form } from 'react-bootstrap'
import Swal from 'sweetalert2/src/sweetalert2'

import axiosInstance from '../../../common/http'

import './Stripeform.css'

const baseStripeElementOptions = {
  style: {
    base: {
      fontSize: '14px',
      color: '#424770',
      letterSpacing: '0.025em',
      fontFamily: 'AzoSans, Helvetica, Arial, sans-serif',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#dc3545',
    },
  },
}

const StripeForm = (props) => {
  const [isDisabled, setDisabled] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const stripe = useStripe()
  const elements = useElements()

  const { handleSubmit, checkoutDetails, form } = props
  const storedToken = localStorage.getItem('authToken')

  const handleStripeSubmit = async (e) => {
    e.preventDefault()
    setDisabled(true)

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
      billing_details: {
        address: {
          city: form.city || null,
          // country: 'ES' || null,
          line1: form.street || null,
          postal_code: form.zip || null,
          state: form.province || null,
        },
        name: form.firstName + ' ' + form.lastName || null,
        phone: form.phone,
      },
    })

    if (error) {
      setErrorMsg(error.message)
      return
    }

    try {
      const { id } = paymentMethod
      const response = await axiosInstance.post(
        '/api/payments',
        {
          amount: checkoutDetails.totalPrice * 100, //in cents
          id,
          currency: 'EUR',
        },
        { headers: { Authorization: `Bearer ${storedToken}` } },
      )

      if (response.data.success) {
        handleSubmit()
        console.log(response.data.message)
        return
      } else {
        setErrorMsg(response.data.message)
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong processing your purchase',
        showConfirmButton: false,
      })
    }
  }

  useEffect(() => {
    !stripe || !elements || !checkoutDetails.products.length
      ? setDisabled(true)
      : setDisabled(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, checkoutDetails.products])

  return (
    <Form onSubmit={handleStripeSubmit}>
      <div id="stripeForm">
        <label>
          Card number
          <CardNumberElement
            options={baseStripeElementOptions}
            onFocus={() => {
              setErrorMsg('')
              setDisabled(false)
            }}
          />
        </label>
        <label>
          Expiration date
          <CardExpiryElement
            options={baseStripeElementOptions}
            onFocus={() => {
              setErrorMsg('')
              setDisabled(false)
            }}
          />
        </label>
        <label>
          CVC
          <CardCvcElement
            options={baseStripeElementOptions}
            onFocus={() => {
              setErrorMsg('')
              setDisabled(false)
            }}
          />
        </label>
        <div className="error-feedback">{errorMsg}</div>
        <Button variant="outline-secondary" type="submit" disabled={isDisabled}>
          Checkout
        </Button>
      </div>
    </Form>
  )
}

export default StripeForm
