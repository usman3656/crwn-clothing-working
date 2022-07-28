import DirectoryItem from '../directory-item/directory-item.component';
import './directory.styles.scss'; 


const Directory = ({categories}) =>{
  return(
    <div className="directory-container">
      {categories.map((categories)=>(
       <DirectoryItem key={categories.id} category={categories}/>
      ))}
      

    </div>
  );
}
export default Directory