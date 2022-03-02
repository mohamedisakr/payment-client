import {Button} from '@chakra-ui/button'
import {Box, HStack} from '@chakra-ui/layout'
import {useToast} from '@chakra-ui/toast'
import cardValidator from 'card-validator'
import {useForm} from 'react-ux-form'
import {isDecimal} from 'validator'
import {pay} from '../services/payment'
import {Input} from '../components/Input'
import {Page} from '../components/Page'

export const CreditCardForm = () => {
  const {Field, resetForm, submitForm} = useForm({
    cardNumber: {
      strategy: 'onFirstSuccessOrFirstBlur',
      initialValue: '',
      sanitize: (value) => value.trim(),
      validate: (value) => {
        if (!cardValidator.number(value).isValid) {
          return 'Card number is invalid'
        }
      },
    },
    expirationDate: {
      strategy: 'onFirstSuccessOrFirstBlur',
      initialValue: '',
      sanitize: (value) => value.trim(),
      validate: (value) => {
        if (!cardValidator.expirationDate(value).isValid) {
          return 'Expiration date is invalid'
        }
      },
    },
    cvc: {
      strategy: 'onFirstSuccessOrFirstBlur',
      initialValue: '',
      sanitize: (value) => value.trim(),
      validate: (value) => {
        if (!cardValidator.cvv(value).isValid) {
          return 'CVV should have 3 characters'
        }
      },
    },
    amount: {
      strategy: 'onFirstSuccessOrFirstBlur',
      initialValue: '',
      sanitize: (value) => value.trim(),
      validate: (value) => {
        if (!isDecimal(value)) {
          return 'Amount is invalid'
        }
      },
    },
  })

  const toast = useToast()
  let paymentToAdd = {}
  let validationErrors = {}

  const checkIfErrorsExists = (errors) => {
    return errors && Object.keys(errors).length ? true : false
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    submitForm(
      (values) => {
        console.log('values', values)
        const {cardNumber, cvc, expirationDate, amount} = values

        paymentToAdd = {
          creditCard: cardNumber,
          expDate: expirationDate,
          cvv: cvc,
          amount,
        }

        toast({
          title: 'Submission succeeded',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      },
      (errors) => {
        console.log('errors', errors)
        validationErrors = {...errors}
        toast({
          title: 'Submission failed',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      },
    )

    try {
      const res = await pay(paymentToAdd)
      console.log(JSON.stringify(paymentToAdd, null, 4))
      console.log(`response : ${JSON.stringify(res, null, 4)}`)

      if (checkIfErrorsExists(validationErrors) === false) {
        resetForm()
      }
    } catch (err) {
      console.log(`Error : ${JSON.stringify(err, null, 4)}`)
      toast.error(`${err.response.data.message}`)
    }
  }

  return (
    <Page title="Credit card">
      <form onSubmit={onSubmit}>
        <Field name="cardNumber">
          {({error, onBlur, onChange, ref, valid, validating, value}) => (
            <Input
              label="Card number"
              placeholder="#### #### #### ####"
              error={error}
              onBlur={onBlur}
              onChangeText={onChange}
              ref={ref}
              valid={valid}
              validating={validating}
              value={value}
            />
          )}
        </Field>

        <Field name="expirationDate">
          {({error, onBlur, onChange, ref, valid, validating, value}) => (
            <Input
              label="Expiration date"
              placeholder="MM/YYYY"
              error={error}
              onBlur={onBlur}
              onChangeText={onChange}
              ref={ref}
              valid={valid}
              validating={validating}
              value={value}
            />
          )}
        </Field>

        <Field name="cvc">
          {({error, onBlur, onChange, ref, valid, validating, value}) => (
            <Input
              label="CVV"
              placeholder="###"
              error={error}
              onBlur={onBlur}
              onChangeText={onChange}
              ref={ref}
              valid={valid}
              validating={validating}
              value={value}
            />
          )}
        </Field>

        <Field name="amount">
          {({error, onBlur, onChange, ref, valid, validating, value}) => (
            <Input
              label="Amount"
              error={error}
              onBlur={onBlur}
              onChangeText={onChange}
              ref={ref}
              valid={valid}
              validating={validating}
              value={value}
            />
          )}
        </Field>

        <Box height={4} />

        <HStack spacing={3}>
          <Button onClick={resetForm}>Reset</Button>

          <Button colorScheme="green" onClick={onSubmit} type="submit">
            Submit
          </Button>
        </HStack>
      </form>
    </Page>
  )
}
