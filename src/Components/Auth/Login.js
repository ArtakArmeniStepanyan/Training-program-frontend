import { useSelector, useDispatch } from 'react-redux';
import { getErrorMessage } from '../../Redux/Slices/CurrentUser/currentUserSelectors';
import { Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { login } from '../../Redux/Slices/CurrentUser/currentUserReducer';

const Login = () => {
  
    const dispatch = useDispatch();
    const errorMessage = useSelector(getErrorMessage);

    const{ register, formState:{errors}, handleSubmit } = useForm();
        const onSubmit = (date) => {
            dispatch(login(date));
        }


    return(
        <>
            <h2>Login Page</h2>

            <div className='formDiv'>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            {...register ("email", {
                                required: 'Email is required'
                            })}
                            type="email" placeholder="Enter email"
                            className={`${errors.email || errorMessage ? "errorInput": ""}`} 
                            />
                            {errors.email ?
                                <Form.Control.Feedback type="invalid" style={{display: "block"}}>
                                {errors.email.message}
                                </Form.Control.Feedback>:
                                <Form.Text className="text-muted" >
                                We'll never share your email with anyone else.
                                </Form.Text>
                            }               
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            {...register ("password", {
                                required: 'Password is required'
                            })}
                            type="password" placeholder="Password" 
                            className={`${errors.password || errorMessage ? "errorInput": ""}`} 
                            />
                            {errors.password ?
                                <Form.Control.Feedback type="invalid" style={{display: "block"}}>
                                {errors.password.message}
                                </Form.Control.Feedback>:''
                            } 
                    </Form.Group>
                    
                    {errorMessage ?
                        <Alert variant="danger" >
                        <Alert.Heading>Wrong email or password</Alert.Heading>
                        </Alert>: ''
                    }

                    <Button variant="secondary" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default Login;