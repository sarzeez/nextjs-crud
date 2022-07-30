import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button, Form, FloatingLabel  } from 'react-bootstrap'
import { useModal } from '../context/ModalContext';

interface MyModalProps {
    onSubmit: (e: React.FormEvent) => void
}

const MyModal = ({onSubmit}: MyModalProps) => {
    const { isOpen, closeModal, postData, setPostData } = useModal();

    const handleCloseModal = () => {
        closeModal();
        setPostData({
            id: '',
            title: '',
            body: ''
        })
    }

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={isOpen}
            onHide={() => {handleCloseModal()}}
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Post {postData.id}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                    setPostData({
                        ...postData,
                        title: e.target.value,
                    })
                    }
                    value={postData.title}
                    required
                    type="text"
                    placeholder="Enter title"
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                        setPostData({
                            ...postData,
                            body: e.target.value,
                        })
                        }
                        value={postData.body}
                        required
                        type="text"
                        placeholder="Body"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Send
                </Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
        </Modal>
    )
}

export default MyModal