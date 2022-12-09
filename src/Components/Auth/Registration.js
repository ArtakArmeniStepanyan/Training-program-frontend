import { useSelector, useDispatch } from 'react-redux';
import { getSuccessMessage } from '../../Redux/Slices/CurrentUser/currentUserSelectors';
import { Form, Button, Alert } from 'react-bootstrap';
import { useForm  } from 'react-hook-form';
import { registration } from '../../Redux/Slices/CurrentUser/currentUserReducer';
import { emailCheckApi } from '../../Api/currentUserApi';
import { useState } from 'react';


const Registration = () => {

    const dispatch = useDispatch();
    const successMessage = useSelector(getSuccessMessage);
    const acceptedImageFormats = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

    const{ register, getValues, formState:{errors}, handleSubmit, reset } = useForm();
        const onSubmit = (date) => {
            dispatch(registration(date));
            reset();
        };

        const emailCheck = (value) => {
            return(
                emailCheckApi(value)
            )
        }
        
        const [show, setShow] = useState(true);

        return(
        <>
        <h2>Registration Page</h2>

        {successMessage && show ?
            <Alert variant="success" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>You successfully registered</Alert.Heading>
            </Alert>: ''
        }

        <div className='formDiv'>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="formImage" className="mb-3">
                    <Form.Label>Select your profile image</Form.Label>
                    <Form.Control
                    {...register ("image", {
                        validate: value => {
                            if(value[0]){
                                if(!acceptedImageFormats.includes(value[0].type))
                                    return('Wrong file type')
                                else if(value[0].size > 3146000)   
                                    return('Max file size 3MB') 
                            }
                        }                               
                    })}
                    type="file" 
                    className={`${errors.image ? "errorInput": ""}`} 
                    />
                    {errors.image ?
                        <Form.Control.Feedback type="invalid" style={{display: "block"}}>
                        {errors.image.message}
                        </Form.Control.Feedback>:''
                    } 
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    {...register ("name", {
                        required: 'Name is required'
                    })}
                    type="text" placeholder="Enter your name" 
                    className={`${errors.name ? "errorInput": ""}`} 
                    />
                    {errors.name ?
                        <Form.Control.Feedback type="invalid" style={{display: "block"}}>
                        {errors.name.message}
                        </Form.Control.Feedback>:''
                    } 
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicSurname">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control 
                    {...register ("surname", {
                        required: 'Surname is required'
                    })}
                    type="text" placeholder="Enter your surname" 
                    className={`${errors.surname ? "errorInput": ""}`} 
                    />
                    {errors.surname ?
                        <Form.Control.Feedback type="invalid" style={{display: "block"}}>
                        {errors.surname.message}
                        </Form.Control.Feedback>:''
                    } 
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                    {...register ("email", {
                        required: 'Email is required',
                        validate: async (value) => await emailCheck(value) || "This email already in use"
                    })}
                    type="email" placeholder="Enter your email" 
                    className={`${errors.email ? "errorInput": ""}`} 
                    />
                    {errors.email ?
                        <Form.Control.Feedback type="invalid" style={{display: "block"}}>
                        {errors.email.message}
                        </Form.Control.Feedback>:''
                    } 
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    {...register ("password", {
                        required: 'Password is required'
                    })}
                    type="password" placeholder="Password" 
                    className={`${errors.password ? "errorInput": ""}`} 
                    />
                    {errors.password ?
                        <Form.Control.Feedback type="invalid" style={{display: "block"}}>
                        {errors.password.message}
                        </Form.Control.Feedback>:''
                    } 
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicRePassword">
                    <Form.Label>Repeat password</Form.Label>
                    <Form.Control 
                    {...register ("rePassword", {
                        // required: 'Please repeat password'
                        validate: value => value === getValues("password") || 'Wrong repeated password'
                    })}
                    type="password" placeholder="Password" 
                    className={`${errors.rePassword ? "errorInput": ""}`} 
                    />
                    {errors.rePassword ?
                        <Form.Control.Feedback type="invalid" style={{display: "block"}}>
                        {errors.rePassword.message}
                        </Form.Control.Feedback>:''
                    }
                </Form.Group>

                <Button variant="secondary" type="submit">
                    Enter
                </Button>
            </Form>
        </div>
        </>
    )
}

export default Registration;