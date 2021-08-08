import React from 'react';
import {Button, Modal} from "react-bootstrap";

interface IModalProps {
    onHide(): void,
    show: boolean,
    titleText: string,
    content: object | string
}

export const ModalComponent: React.FC<IModalProps> = ({show, onHide, titleText, content}) => {
    return (
        <>
            <Modal show={show} onHide={onHide} centered backdrop="static" size='sm'>
                <Modal.Header className='d-flex justify-content-center'>
                    <Modal.Title>{titleText}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex justify-content-center flex-column align-items-center'>
                    {content}
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center'>
                    <Button variant="success" onClick={onHide}>Start new game</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
