import { Form, Offcanvas, Button, Alert } from 'react-bootstrap';
import { useForm  } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getErrorMessage, getSuccessMessage, getCurrentUser } from '../../../../../Redux/Slices/CurrentUser/currentUserSelectors';
import { editPassword } from '../../../../../Redux/Slices/CurrentUser/currentUserReducer';


const PassEditorCanvas = ({ showCanvas, handleClose }) => {
    const{ register, getValues, formState:{errors}, handleSubmit, reset } = useForm();
        const onSubmit = (date) => {
            dispatch(editPassword(date));
            reset();
        };

    const user = useSelector(getCurrentUser);
    const dispatch = useDispatch();
    const errorMessage = useSelector(getErrorMessage);
    const successMessage = useSelector(getSuccessMessage);

    return(
        <Offcanvas show={showCanvas} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Password editor</Offcanvas.Title>
        </Offcanvas.Header>
        {errorMessage ?
            <Alert variant="danger">
                <Alert.Heading>Old password is wrong</Alert.Heading>
            </Alert>: ''
            }

        {successMessage ?
            <Alert variant="success">
                <Alert.Heading>Changes saved</Alert.Heading>
            </Alert>: ''
            }

        <Offcanvas.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="OldPassword">
                    <Form.Label>Old password</Form.Label>
                    <Form.Control
                    {...register ("oldPassword", {
                        required: 'Old password is required'
                    })}
                    type="password"  
                    className={`${errors.oldPassword || errorMessage ? "errorInput": ""}`} 
                    />
                    {errors.oldPassword ?
                        <Form.Control.Feedback type="invalid" style={{display: "block"}}>
                        {errors.oldPassword.message}
                        </Form.Control.Feedback>:''
                    } 
                </Form.Group>
                <Form.Group className="mb-3" controlId="NewPassword">
                    <Form.Label>New password</Form.Label>
                    <Form.Control
                    {...register ("newPassword", {
                        required: 'New password is required'
                    })}
                    type="password" 
                    className={`${errors.newPassword ? "errorInput": ""}`} 
                    />
                    {errors.newPassword ?
                        <Form.Control.Feedback type="invalid" style={{display: "block"}}>
                        {errors.newPassword.message}
                        </Form.Control.Feedback>:''
                    } 
                </Form.Group>
                <Form.Group className="mb-3" controlId="RePassword">
                    <Form.Label>Repeat new password</Form.Label>
                    <Form.Control
                    {...register ("rePassword", {
                        required: 'Repeat password',
                        validate: value => value === getValues("newPassword") || 'Wrong repeated password'
                    })}
                    type="password"  
                    className={`${errors.rePassword ? "errorInput": ""}`} 
                    />
                    {errors.rePassword ?
                        <Form.Control.Feedback type="invalid" style={{display: "block"}}>
                        {errors.rePassword.message}
                        </Form.Control.Feedback>:''
                    } 
                </Form.Group>
                <Form.Group className="mb-3" controlId="UserId">
                        <Form.Control
                        {...register ("userId")}
                        type="hidden" defaultValue={user.userId} 
                        />
                    </Form.Group>
                <Button variant="secondary" type="submit">
                    Enter
                </Button>
            </Form>
        </Offcanvas.Body>
    </Offcanvas>
    )
}
export default PassEditorCanvas;