import style from './galleryStyle.module.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentFolderSelector, getCurrentImagesSelector, getSuccessMessage } from '../../../../Redux/Slices/Gallery/gallerySelector';
import { useEffect } from 'react';
import { getCurrentFolder, getCurrentImages, deleteFolder, deleteImage } from '../../../../Redux/Slices/Gallery/galleryReducer';
import { Button, Alert, Modal } from 'react-bootstrap';
import { confirm } from 'react-confirm-box';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FileAddingForm from './FileAddingForm';

const Folder = () => {
    const params = useParams();
    const folderId = params.id;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCurrentFolder(folderId));
        dispatch(getCurrentImages(folderId));
    },[])
    const folder = useSelector(getCurrentFolderSelector);
    const images = useSelector(getCurrentImagesSelector);

    const navigate = useNavigate();

    const deleteFolderHandler = async (id) => {
        const result = await confirm("Delete folder?");
        if (result){
            dispatch(deleteFolder(id));
            navigate(-1);
        }
    }
    const deleteImageHandler = async (id) => {
        // console.log(selectedImg);
        const result = await confirm("Delete image?");
        if (result){
            dispatch(deleteImage(id));
            setSelectedImg(false);
        }
    }

    const message = useSelector(getSuccessMessage);
    const[showForm, setShowForm] = useState(false);
    const[selectedImg, setSelectedImg] = useState(false);
    return(
        <>
            {message?
                <Alert variant="success" >
                    <Alert.Heading>{message}</Alert.Heading>
                </Alert>: ''
            }

            <Modal show={selectedImg} onHide={() => {setSelectedImg(false)}} animation={false} size='xl'>
                <Modal.Header closeButton>
                    <Button variant="danger" onClick={() => {deleteImageHandler(selectedImg.id)}}>Delete image</Button>
                </Modal.Header>
                <Modal.Body className={style.modalBody}>
                    <img src={'http://server.am/storage/' + selectedImg.image} className={style.selectedImage}/>
                </Modal.Body>
            </Modal>

            <div className={style.folderHeader}>
                <h3>{folder.folderName}</h3>
                <Button variant="danger" onClick={() => {deleteFolderHandler(folderId)}}>Delete folder</Button>
            </div>
            
            <div className={style.folderBody}>
                {images.map(image => 
                    <img key={image.id} src={'http://server.am/storage/' + image.image} onClick={() => {setSelectedImg(image)}}/>)}
            </div>

            {showForm?
                <div className={style.folderFooter}>
                    <Button variant="link" onClick={() => {setShowForm(!showForm)}}>Close</Button>
                    <div className={style.filesForm}>
                        <FileAddingForm folderId={folderId}/>
                    </div>
                </div>
                 : 
                <div className={style.folderFooter}>
                    <Button variant="link" onClick={() => {setShowForm(!showForm)}}>Add image</Button>
                </div>}
        </>
    )
}

export default Folder;