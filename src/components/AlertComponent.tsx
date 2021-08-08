import React from 'react';
import Alert from 'react-bootstrap/Alert'

interface IAlertProps {
    variant: string,
    title?: string,
    body: string,
    show: boolean
}

export const AlertComponent: React.FC<IAlertProps> = ({variant, title, body, show}) => {
    return (
        <div>
            <Alert variant={variant} show={show} transition>
                <Alert.Heading>{title}</Alert.Heading>
                {body}
            </Alert>
        </div>
    );
};
