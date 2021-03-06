import {FormLabel} from '@chakra-ui/form-control'
import {useId} from '@chakra-ui/hooks'
import {CheckIcon, WarningIcon} from '@chakra-ui/icons'
import {
  Input as ChakraInput,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/input'
import {Box, Text} from '@chakra-ui/layout'
import {Spinner} from '@chakra-ui/spinner'
import {forwardRef} from 'react'

export const Input = forwardRef(
  (
    {
      error,
      label,
      onBlur,
      onChange,
      placeholder,
      onChangeText,
      valid,
      validating,
      value,
    },
    forwardedRef,
  ) => {
    const id = useId()

    return (
      <Box>
        <FormLabel htmlFor={id}>{label}</FormLabel>

        <InputGroup>
          <ChakraInput
            id={id}
            placeholder={placeholder}
            ref={forwardedRef}
            error={error}
            onBlur={onBlur}
            value={value}
            isInvalid={error != null}
            onChange={(e) => {
              onChange?.(e)
              onChangeText?.(e.target.value)
            }}
          />

          {valid && (
            <InputRightElement>
              <CheckIcon color="green.500" />
            </InputRightElement>
          )}

          {validating && (
            <InputRightElement>
              <Spinner color="blue.500" size="sm" />
            </InputRightElement>
          )}

          {error != null && (
            <InputRightElement>
              <WarningIcon color="red.500" />
            </InputRightElement>
          )}
        </InputGroup>

        <Box height={8}>
          {error != null && (
            <Text color="red.500" fontWeight={500}>
              {error}
            </Text>
          )}
        </Box>
      </Box>
    )
  },
)
