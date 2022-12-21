import style from './galleryStyle.module.css';
import { Link } from 'react-router-dom';


const FolderIcon = ({folderName, id}) => {
    return(
        <div className={style.singleImage}>
            <Link to={'/folder/' + id} className={style.foldersLink}>
            <img 
                className={style.folderImg} 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Folder.svg/1024px-Folder.svg.png"
            />
            <p>{folderName}</p>
            </Link>
        </div>
    )
}

export default FolderIcon