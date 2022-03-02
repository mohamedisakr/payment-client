import {Flex} from '@chakra-ui/layout'
import * as React from 'react'
import {Route} from 'wouter'
import {CreditCardForm} from './forms/CreditCardForm'

export const App = () => (
  <Flex flex={1} flexDirection={{base: 'column', md: 'row'}}>
    <Route path="/" component={CreditCardForm} />
  </Flex>
)
