import style from './galleryStyle.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGalleryFolders, getSuccessMessage } from '../../../../Redux/Slices/Gallery/gallerySelector';
import { getCurrentUserId } from '../../../../Redux/Slices/CurrentUser/currentUserSelectors';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import FolderIcon from './FolderIcon';
import { createFolder, getUserFolders } from '../../../../Redux/Slices/Gallery/galleryReducer';
import { useEffect } from 'react';


const Gallery = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [folderName, setFolderName] = useState('');

    const handleClose = () => {
        setShow(false);
        setFolderName('');
    };
    const handleShow = () => setShow(true);

    const handleCreate = () => {
        dispatch(createFolder(userId, folderName));
        handleClose();
    }

    const folders = useSelector(getGalleryFolders);
    const userId = useSelector(getCurrentUserId);

    useEffect(() => {
        dispatch(getUserFolders(userId));
    },[])

    const message = useSelector(getSuccessMessage);

    return(
        <>
            {message?
                <Alert variant="success" >
                    <Alert.Heading>{message}</Alert.Heading>
                </Alert>: ''
            }

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control 
                        type="text" 
                        placeholder="Folder name" 
                        value={folderName}
                        onChange={(e)=>{setFolderName(e.target.value)}}    
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreate}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>


            <Button variant="link" onClick={handleShow}>Create new folder</Button>
            <div className={style.images}>
            {folders.map(folder=>
                <FolderIcon key={folder.id} folderName={folder.folderName} id={folder.id}/> 
            )}
            </div>
        </>
    )
}

export default Gallery;