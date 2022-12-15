import { Button, Form, InputGroup } from 'react-bootstrap';
import style from './weatherStyle.module.css';
import { useForm  } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getCoordinates } from '../../../../Redux/Slices/Weather/weatherReducer';


const CityForm = () => {

  const dispatch = useDispatch();
  const{ register, getValues, formState:{errors}, handleSubmit, reset } = useForm();
  const onSubmit = (date) => {
    dispatch(getCoordinates(date.city));
    reset();
  };

  return (
    <div className={style.formDiv}>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <InputGroup className="mb-3">
              <Form.Control

                {...register ("city", {
                  required: 'City is required'
                })}
                type="text" placeholder="Enter city" 
                className={`${errors.city ? "errorInput": ""}`} 
                aria-describedby="basic-addon2"
              />
              <Button variant="outline-secondary" type="submit">
                Button
              </Button>
          </InputGroup>
          {errors.city ? 
            <Form.Control.Feedback type="invalid" style={{display: "block"}} className={style.errorMessage}>
              {errors.city.message}
            </Form.Control.Feedback>:''
          }
        </Form>
    </div>
  );
}

export default CityForm;