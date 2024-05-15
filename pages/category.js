import Layout from "@/components/layout";
import axios from "axios";
import { withSwal } from 'react-sweetalert2';
import Image from "next/image";
import { useEffect, useState } from "react";
function Category({swal}){
        const [editedCategory, setEditedCategory] = useState(null);
        const [name,setName] = useState('');
        const [parentCategory,setParentCategory] = useState('');
        const [category,setCategory] = useState([]);
        useEffect(() =>{
         fetchCategory();
        }, [])
    
        function fetchCategory(){
            axios.get('/api/category').then(result => {
                setCategory(result.data);
            });
        }
        async function saveCategory(ev){
            ev.preventDefault();
            const data={name,parentCategory};
            if (editedCategory){
                data._id = editedCategory._id;
    await axios.put('/api/category', data);
    setEditedCategory(null);
    
            }else {
                await axios.post('/api/category', data);
               
            }
            setName('');
            fetchCategory();
          
        }
        function editCategory(category){
            setEditedCategory(category);
            setName(category.name);
            setParentCategory(category.parent?._id);
    
        }
    function deleteCategory(category){
        swal.fire({
            title: 'Are You Sure?',
            text: `Do you want to delete ${category.name}?`,
            showCancelButton:'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true,
        }).then(async result => {
           if(result.isConfirmed){
            const {_id} = category;
            axios.delete('/api/category?_id='+_id);
            fetchCategory();
           }
        }).catch(error => {
            // when promise rejected...
        });
    }
        return (
           <Layout>
    <h1>Category Section</h1>
    <label className="block uppercase tracking-wide text-red-700 italic  text-xs font-bold mb-2">
       👉👉 {editedCategory 
        ? `You are editing Category Section named ${editedCategory.name}` : 'You are at Create New Category Section'}</label>
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={saveCategory}>
        <div class="flex flex-wrap -mx-3 mb-6">
    
        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text"
         placeholder={'category name'}
         onChange={ev => setName(ev.target.value)}
         value={name}
        />
              <p class="text-red-500 text-xs italic">Please check out spelling before.</p>
    
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
    
        <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        onChange={ev => setParentCategory(ev.target.value)}
        value={parentCategory}>
            <option value="0">No Parent Category</option>
            {category.length > 0 && category.map(category =>
                (
<option key={category._id} value={category._id}>{category.name}</option>
    
                    
                   )) }
    
        </select>
        <p class="text-red-500 text-xs italic">**Please choose the right parent category</p>
    
          </div>
        <button type="submit" className="btn-primary py-1">Save</button>
    
     
    </form>
    
    <div class="flex flex-col">
  <div class="-m-1.5 overflow-x-auto">
    <div class="p-1.5 min-w-full inline-block align-middle">
      <div class="overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border-red-400">
          <thead>
            <tr>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Category</th>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Parent Category</th>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Actions</th>
               </tr>        
           
           
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            {category.length > 0 && category.map(category =>
                (
                <tr key={category.name}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200"> {category.name}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"> {category?.parent?.name}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    <button 
                    onClick={() => editCategory(category)} 
                    className="btn-primary mr-1">Edit</button>
                    <button 
                    onClick={() => deleteCategory(category)}
                    className="btn-red">Delete</button>
    
                    </td>
                    </tr>
                    
                   )) }
        </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
           </Layout>
        );
    }
export default withSwal(({swal}, ref) =>(
    <Category swal={swal}/>
));

