import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ModalControl from './components/ModalControl'


function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [data, setData] = useState([])
  const [dataEdit, setDataEdit] = useState([])

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  })

  useEffect(() => {
    const db_constumer = localStorage.getItem("cad_cliente")
      ? JSON.parse(localStorage.getItem("cad_cliente"))
      : []

      setData(db_constumer)
  }, [setData])


const handleRemove = (email)=> {
  const newArray = data.filter((item) => item.email !== email)

  setData(newArray)

  localStorage.setItem("cad_clente", JSON.stringify(newArray))
}
  return (
    <Flex
      h='100vh'
      align='center'
      justify='cente'
      fontSize='20px'
    >
      <Box maxW={800} w='100%' h='100vh' py={10} px={2}>
        <Button onClick={() => [setDataEdit({}), onOpen()]} colorScheme='blue'>
          Novo Cadastro
        </Button>
        <Box overflow='auto' height='100%'>
          <Table>
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize='20px'>
                  Name
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize='20px'>
                  E-mail
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ name, email, }, index) => (
                <Tr key={index} cursor='point' _hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 5 : 100}>{name}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{email}</Td>
                  <Td p={0} display='flex'>
                    <EditIcon
                    cursor='pointer'
                      fontSize={20}
                      onClick={() => [
                        setDataEdit({ name, email, index }),
                        onOpen(),
                      ]}
                    />
                    <Td p={0}>
                      <DeleteIcon
                      cursor='pointer'
                        fontSize={20}
                        onClick={() => handleRemove(email)}
                      />
                    </Td>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <ModalControl
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          onClose={onClose}
          isOpen={isOpen}
        />
      )}
    </Flex>
  )
}

export default App
