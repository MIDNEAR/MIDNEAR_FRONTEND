import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import SortMenu from './SortMenu'
import ProdList from './ProdList'


const AllShop = () => {
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialSort = params.get("sort") || "latest";
  const initialPage = parseInt(params.get("page")) || 1;

  const [sort, setSort] = useState(initialSort);
  const [prodList, setProdList] = useState([]);
  const {category, subCategory} = useParams();
  const [pageInfo, setPageInfo] = useState({});
  const [currPage, setCurrPage] = useState(initialPage);
  const title = `${category?.toUpperCase()} ${subCategory ? `- ${subCategory.toUpperCase()}` : ''}`

  const loadProdList = async(pageNumber = currPage) => {
    await axios.get(`${DOMAIN}/product/by-category`,{
      params: {
        categoryId: 1,
        pageNumber,
        sort,
      }
    })
    .then((res)=>{
      if(res.status === 200){
        setProdList(res.data.data);
      } 
    })
    .catch((error) => {
      console.error('상품 리스트 로드 실패:', error.response || error.message);
    })
  };
  
  const totalPage = async() => {
    await axios.get(`${DOMAIN}/product/totalAndPage`,{
      params: {
        categoryId: 1,
      }
    })
    .then((res)=>{
      if(res.status === 200){
        setPageInfo(res.data.data);
        console.log('페이징 완');
      } 
    })
    .catch((error) => {
      console.error('페이징 정보 로드 실패:', error.response || error.message || error.data);
    })
  };

  useEffect(() => {
    loadProdList(currPage);
    totalPage();
  },[currPage, sort]);

  const handleSortChange = (newSort) => {
    setSort(newSort);
    navigate(`?sort=${newSort}}&page=${currPage}`);
  };
  
  useEffect(() => {
    if (!params.get("sort")) {
      navigate(`?sort=${sort}}&page=${currPage}`, { replace: true }); 
    }
  }, [sort, currPage, navigate, params]);

  return (
    <div className='container'>
    <div className='all-shop'>
      
      <div className='top-el'>
        <div className='title'>{title}</div>
        <div className='sort'>
          <SortMenu SortChange={handleSortChange} isNotice={false}/>
        </div>
      </div>
      
      <div>
        <ProdList productList={prodList} pageInfo={pageInfo} currPage={currPage} setCurrPage={setCurrPage}/>
      </div>
    </div>
    </div>
  )
}

export default AllShop