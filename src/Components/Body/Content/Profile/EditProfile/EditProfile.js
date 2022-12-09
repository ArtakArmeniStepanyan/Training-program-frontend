import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser, getSuccessMessage } from '../../../../../Redux/Slices/CurrentUser/currentUserSelectors';
import { useForm  } from 'react-hook-form';
import { editProfile, removeImage, setSuccessMessageAC } from '../../../../../Redux/Slices/CurrentUser/currentUserReducer';
import { emailCheckForRegisteredUserApi } from '../../../../../Api/currentUserApi';
import style from '../profileStyles.module.css';
import { useState } from 'react';
import PassEditorCanvas from './PasswordEditorCanvas';
import { confirm } from "react-confirm-box";

const EditProfile = () => {
    const dispatch = useDispatch();

    const user = useSelector(getCurrentUser);
    const successMessage = useSelector(getSuccessMessage);
    const acceptedImageFormats = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

    const [image, setImage] = useState(null);
    const [show, setShow] = useState(false);
    const [showCanvas, setShowCanvas] = useState(false);
    
    const handleClose = () => setShowCanvas(false);
    const handleShow = () => setShowCanvas(true);

    const handleCloseMessage = () => {
        setShow(false);
        dispatch(setSuccessMessageAC(false))
    }
console.log(successMessage);
console.log(show);
    if(successMessage && show !== true){
        setShow(true)
    }

    const emailCheck = (value) => {
        return(
            emailCheckForRegisteredUserApi(value, user.userId)
        )
    }

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    const imageRemoveHandler = async () => {
        const result = await confirm("Remove image?");
        if (result) {
          dispatch(removeImage(user.userId)) 
          return;
        }
    }

    const{ register, getValues, formState:{errors}, handleSubmit, reset } = useForm();
        const onSubmit = (date) => {
            dispatch(editProfile(date));
            reset();
        };


    return(
        <>
        {show ?
            <Alert variant="success" onClose={handleCloseMessage} dismissible>
                <Alert.Heading>Changes saved</Alert.Heading>
            </Alert>: ''
            }
        <Row>
            <Col lg={6}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="formImage" className="mb-3">
                        <Form.Label>Select profile image</Form.Label>
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
                        onChange={onImageChange}
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
                        type="text" defaultValue={user.name} 
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
                        type="text" defaultValue={user.surname} 
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
                        type="email" defaultValue={user.email} 
                        className={`${errors.email ? "errorInput": ""}`} 
                        />
                        {errors.email ?
                            <Form.Control.Feedback type="invalid" style={{display: "block"}}>
                            {errors.email.message}
                            </Form.Control.Feedback>:''
                        } 
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicUserId">
                        <Form.Control
                        {...register ("userId")}
                        type="hidden" defaultValue={user.userId} 
                        />
                    </Form.Group>

                    <div className={style.profileEditPageFooter}>
                        <Button variant="secondary" type="submit">
                            Enter
                        </Button>
                        <Button variant="link" onClick={handleShow}>
                            Edit password
                        </Button>
                    </div>
                </Form>
            </Col>
            <Col lg={6}>
                <p>Profile Image</p>
                <img src={image? image : user.image? 'http://server.am/storage/' + user.image :
                    'https://cdn-icons-png.flaticon.com/512/149/149071.png'} 
                    className={style.editAvatar} />
                    <div className={style.removeImageDiv}>  
                        <Button variant="danger" size="sm" disabled={!user.image} onClick={() => {imageRemoveHandler()}}>
                            Remove image
                        </Button>
                    </div>
            </Col>
        </Row>
        <PassEditorCanvas showCanvas={showCanvas} handleClose={handleClose}/>
        </>
    )
}

export default EditProfile;