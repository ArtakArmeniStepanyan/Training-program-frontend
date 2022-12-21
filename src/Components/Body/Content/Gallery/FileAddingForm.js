import { Form, Button, Row, Col } from 'react-bootstrap';
import { useForm  } from 'react-hook-form';
import { useState } from 'react';
import style from './galleryStyle.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { saveImage } from '../../../../Redux/Slices/Gallery/galleryReducer';

const FileAddingForm = ({folderId}) => {
    const dispatch = useDispatch();
    const acceptedImageFormats = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    const [image, setImage] = useState(null);

    const{ register, formState:{errors}, handleSubmit, reset } = useForm();
        const onSubmit = (date) => {
            dispatch(saveImage(date));
            console.log(date);
            setImage(null);
            reset();
        };

        const onImageChange = (event) => {
            if (event.target.files && event.target.files[0]) {
              setImage(URL.createObjectURL(event.target.files[0]));
            }
        }
    return(
        <Row>
            <Col lg={7}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="formImage" className="mb-3">
                        <Form.Label>Select image</Form.Label>
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
                    <Form.Group controlId="formImage" className="mb-3">
                        <Form.Control
                            {...register ("folderId", {})}
                            type="hidden" 
                            value={folderId}
                        />
                    </Form.Group>
                    <Button variant="secondary" type="submit">Add</Button>
                </Form>
            </Col>
            <Col lg={5}>
                {image? <img src={image} className={style.imagePreview} />:''}
            </Col>
        </Row>
        
    )
}

export default FileAddingForm;