import React, { useMemo } from 'react'
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js'

import { Button, Form } from 'react-bootstrap'
import './Stripeform.css'

import useResponsiveFontSize from '../../../common/customHooks/useResponsiveFontSize'

const useOptions = () => {
  const fontSize = useResponsiveFontSize()
  return useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'AzoSans, Helvetica, Arial, sans-serif',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    }),
    [fontSize],
  )
}

const StripeForm = (props) => {
  const stripe = useStripe()
  const elements = useElements()
  const options = useOptions()

  const { handleSubmit } = props

  const handleSubSubmit = async (e) => {
    e.preventDefault()

    const orderDetails = await handleSubmit()

    console.log(orderDetails)

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    // const payload = await stripe.createPaymentMethod({
    //   type: 'card',
    //   card: elements.getElement(CardNumberElement),
    // })
    // console.log('[PaymentMethod]', payload)
  }

  return (
    <Form onSubmit={handleSubSubmit}>
      <div id="stripeForm">
        <label>
          Card number
          <CardNumberElement
            options={options}
            onReady={() => {
              console.log('CardNumberElement [ready]')
            }}
            onChange={(event) => {
              console.log('CardNumberElement [change]', event)
            }}
            onBlur={() => {
              console.log('CardNumberElement [blur]')
            }}
            onFocus={() => {
              console.log('CardNumberElement [focus]')
            }}
          />
        </label>
        <label>
          Expiration date
          <CardExpiryElement
            options={options}
            onReady={() => {
              console.log('CardNumberElement [ready]')
            }}
            onChange={(event) => {
              console.log('CardNumberElement [change]', event)
            }}
            onBlur={() => {
              console.log('CardNumberElement [blur]')
            }}
            onFocus={() => {
              console.log('CardNumberElement [focus]')
            }}
          />
        </label>
        <label>
          CVC
          <CardCvcElement
            options={options}
            onReady={() => {
              console.log('CardNumberElement [ready]')
            }}
            onChange={(event) => {
              console.log('CardNumberElement [change]', event)
            }}
            onBlur={() => {
              console.log('CardNumberElement [blur]')
            }}
            onFocus={() => {
              console.log('CardNumberElement [focus]')
            }}
          />
        </label>

        <Button variant="outline-secondary" type="submit">
          Checkout
        </Button>
      </div>
    </Form>
  )
}

export default StripeForm
