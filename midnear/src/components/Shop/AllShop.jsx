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

  const [sort, setSort] = useState(initialSort);
  const [prodList, setProdList] = useState([]);
  const {category, subCategory} = useParams();
  const [pageInfo, setPageInfo] = useState({});
  const [currPage, setCurrPage] = useState(1);
  const title = `${category?.toUpperCase()} ${subCategory ? `- ${subCategory.toUpperCase()}` : ''}`
  const [isSale, setIsSale] = useState(false);
  const [isSoldOut, setIsSoldOut] = useState(false);
  const today = new Date();

  const loadProdList = async(pageNumber = 1) => {
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

        if(res.data.data.saleStatus === "품절"){
          setIsSoldOut(true);
        } else {
          setIsSoldOut(false);
        }

        const discountStartDate = res.data.data.discountStartDate;
        const discountEndDate = res.data.data.discountEndDate;   
        if (discountStartDate === null || discountEndDate === null) {
          setIsSale(false);
        } else {
          const startDate = new Date(discountStartDate);
          const endDate = new Date(discountEndDate);
          if (startDate <= today && endDate >= today) {
            setIsSale(true); 
          } else {
            setIsSale(false);
          }
        }
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
    navigate(`?sort=${newSort}`);
  };
  
  useEffect(() => {
    if (!params.get("sort")) {
      navigate(`?sort=${sort}`, { replace: true }); 
    }
  }, [sort, navigate, params]);

  return (
    <div className='container'>
    <div className='all-shop'>
      
      <div className='top-el'>
        <div className='title'>{title}</div>
        <div className='sort'>
          <SortMenu SortChange={handleSortChange}/>
        </div>
      </div>
      
      <div>
        <ProdList productList={prodList} pageInfo={pageInfo} isSale={isSale} isSoldOut={isSoldOut} 
            currPage={currPage} setCurrPage={setCurrPage}/>
      </div>
    </div>
    </div>
  )
}

export default AllShop