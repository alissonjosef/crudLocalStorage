import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Box, Input } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
    isOpen: () => void
    onClose: boolean
}

export default function ModalControl({ data, setData, dataEdit, onClose, isOpen }) {
    const [name, setName] = useState(dataEdit.name || "")
    const [email, setEmail] = useState(dataEdit.email || "")

    const handleSave = () => {
        if (!name || !email) return

        if (emailAlreadyExists()) {
            return alert("E-mail ja cadastrado")
        }

        if (Object.keys(dataEdit).length) {
            data[dataEdit.index] = { name, email }
        }

        const newDataArray = !Object.keys(dataEdit).length
            ? [...(data ? data : []), { name, email }]
            : [...(data ? data : [])]
            localStorage.setItem("card_cliente", JSON.stringify(newDataArray))

            setData(newDataArray)

            onClose()
    }

    const emailAlreadyExists = () => {
        if (dataEdit.email !== email && data?.length) {
            return data.find((item) => item.email === email)
        }

    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastro de Cliente</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl display='flex' flexDir='column' gap={4}>
                            <Box>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    type='text'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Box>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter justifyContent='start'>
                        <Button colorScheme="green" mr={3} onClick={handleSave}>
                            Salvar
                        </Button>
                        <Button colorScheme="green" mr={3} onClick={onclose}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}