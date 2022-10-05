import { useEffect } from 'react';
import { useState } from 'react';
import ItemList from '../componentes/ItemList';
import GetProducts from '../utils/getProducts';
import { useParams } from 'react-router-dom';
import costumFetch from '../utils/costumFetch'
import { collection, getDocs } from 'firebase/firestore';
import {db} from '../utils/firebaseConfig'

const ItemListContainer=()=>{

const[ProdList, setProdList] = useState([]);
const {id} = useParams();


useEffect(()=>{
    const firestoreFetch = async() => {
        const querySnapshot = await getDocs(collection(db, "getProducts"));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    } 
    firestoreFetch();
},[ProdList]);

useEffect(()=>{
    if(id){
costumFetch(2000, GetProducts.filter(item => item.category === id))
.then((response)=> setProdList(response))
.catch(()=>console.error('error'))
.finally()
    }else{

        costumFetch(2000, GetProducts)
        .then((response)=> setProdList(response))
        .catch(()=>console.error('error'))
        .finally()
    }

},[id])

return(
<>
<div className='container-card'>
<ItemList products={ProdList}/>
</div>
</>
)
;   
}


export default ItemListContainer