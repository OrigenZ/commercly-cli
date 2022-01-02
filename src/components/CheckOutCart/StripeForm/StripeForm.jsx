import { useEffect, useState } from 'react'
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js'
import { Button, Form } from 'react-bootstrap'

// import useResponsiveFontSize from '../../../common/customHooks/useResponsiveFontSize'
import './Stripeform.css'

const StripeForm = (props) => {
  const [isDisabled, setDisabled] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const stripe = useStripe()
  const elements = useElements()

  const { handleSubmit, checkoutDetails, form } = props

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

  const handleStripeSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements || !checkoutDetails.products.length) {
      setDisabled(true)
      return
    }

    //stripe.redirectToCheckout(options?)
    //this is a mockup, only creates a payment method, does not process the payment
    const payload = await stripe.createPaymentMethod({
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
        phone: form.phone || null,
      },
    })

    if (payload.error) {
      setErrorMsg(payload.error.message)
      return
    }
    handleSubmit()
    console.log('createPaymentMethod', payload)
  }

  useEffect(() => {
    if (!stripe || !elements || !checkoutDetails.products.length) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
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
            }}
          />
        </label>
        <label>
          Expiration date
          <CardExpiryElement
            options={baseStripeElementOptions}
            onFocus={() => {
              setErrorMsg('')
            }}
          />
        </label>
        <label>
          CVC
          <CardCvcElement
            options={baseStripeElementOptions}
            onFocus={() => {
              setErrorMsg('')
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
