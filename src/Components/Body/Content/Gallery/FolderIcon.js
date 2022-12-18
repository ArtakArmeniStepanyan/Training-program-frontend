import style from './galleryStyle.module.css';

const FolderIcon = ({folderName}) => {
    return(
        <div className={style.singleImage}>
            <img className={style.folderImg} src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Folder.svg/1024px-Folder.svg.png"/>
            <p>{folderName}</p>
        </div>
    )
}

export default FolderIcon