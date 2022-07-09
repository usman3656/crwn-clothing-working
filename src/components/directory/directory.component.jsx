import React from 'react'
import ReactDOM from 'react-dom'
import CategoryItem from '../category-item/category-item.component.jsx';
import './directory.styles.scss';


const Directory = ({categories}) =>{
  return(
    <div className="directory-container">
      {categories.map((categories)=>(
       <CategoryItem key={categories.id} category={categories}/>
      ))}
      

    </div>
  );
}
export default Directory