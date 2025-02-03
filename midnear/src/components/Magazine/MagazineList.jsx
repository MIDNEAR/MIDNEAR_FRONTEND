import React, {useState, useEffect} from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom'
import axios from 'axios'
import SortMenu from '../Shop/SortMenu'
import search from '../../assets/img/magazine/search.svg'

const MagazineList = () => {
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialSort = params.get("sort") || "latest";
  
  const [sort, setSort] = useState(initialSort);
  const [isClickBtn, setClickBtn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [magazines, setMagazines] = useState([]);
  const [searchValue, setSearchValue] =  useState(params.get('searchValue') || '');


  const loadMagazineList = async() => {
      await axios.get(`${DOMAIN}/userMagazine/list`,{
        params: {
          sort,
        }
      })
      .then((res)=>{
        if(res.status === 200){
          const transformedData = res.data.data.map((item) => ({
            ...item,
            createdDate: item.createdDate.replace(/-/g, '. '), 
          }));
          setMagazines(transformedData);
        } 
      })
      .catch((error) => {
        console.error('매거진 로드 실패:', error.response || error.message);
      })
  };
  const loadSearchList = async() => {
    await axios.get(`${DOMAIN}/userMagazine/search`,{
      params: {
        sort, searchValue,
      }
    })
    .then((res)=>{
      if(res.status === 200){
        const transformedData = res.data.data.map((item) => ({
          ...item,
          createdDate: item.createdDate.replace(/-/g, '. '), 
        }));
        setMagazines(transformedData);
      } 
    })
    .catch((error) => {
      console.error('검색 결과 로드 실패:', error.response || error.message);
    })
  };
  
  useEffect(() => {
    if (searchValue.trim() === '') {
      loadMagazineList(); 
    } else {
      loadSearchList();
    }
  },[sort]);

  const handleSortChange = (newSort) => {
    setSort(newSort);
    navigate(`?sort=${newSort}${searchValue ? `&searchValue=${searchValue}` : ''}`);
  };

  useEffect(() => {
    if (!params.get("sort")) {
      navigate(`?sort=${sort}`, { replace: true }); 
    }
  }, [sort, navigate, params]);

  const topList = magazines.filter((_, index) => index % 2 === 0);
  const bottomList = magazines.filter((_, index) => index % 2 !== 0);

  const clickSearchBtn = ()=>{
    setClickBtn(!isClickBtn);
  };
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value); 
  };
  
  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' || isClickBtn) {
      navigate(`?sort=${sort}&searchValue=${searchValue.trim()}`);
      if (searchValue.trim() === '') {
        loadMagazineList();
      } else {
        loadSearchList();
      }
    }
  };
  
  useEffect(()=>{
      const checkMax =() => {
        setIsMobile(window.innerWidth <= 500);
      };
      checkMax();
      window.addEventListener("resize", checkMax);
      return () => window.removeEventListener("resize", checkMax);
  },[]);
  
  return (
    <div className='Magazine'>
      <div className='container'>

        <div className='top'>
          <div className='title'>MAGAZINE</div>
          <div className='left-el'>
          <div className={`sort  ${isClickBtn ? 'click' : ''}`}>
            <SortMenu SortChange={handleSortChange} />
          </div>
          
          {!isMobile && (
              <div className='search-bar'>
                <input type='text' 
                value={searchValue}
                onChange={handleSearchChange} 
                onKeyDown={handleSearchSubmit} 
                />
                <img src={search} className='search-btn' />
              </div>
            )}
            {isMobile && (
                <div className={`search-bar ${isClickBtn ? 'click' : ''}`}>
                <input type='text' 
                value={searchValue}
                onChange={handleSearchChange} 
                onKeyDown={handleSearchSubmit}
                />
                <img src={search} className='search-btn' onClick={clickSearchBtn}/>
              </div>
            )}
        </div>
        </div>

        <div className='bottom'>
          <div className='magazine-list'>
            {[topList, bottomList].map((list, index) => (
              <div key={index} className={`list-section ${index === 0 ? 'top-list' : 'bottom-list'}`}>
                {list.map((item) => (
                  <Link to={`/others/magazine/detail?magazineId=${item.magazineId}`} key={item.magazineId}>
                    <div className="magazine">
                      <img src={item.mainImage} alt={item.title} className="thumbnail" />
                      <div className="magazine-info">
                        <p className="date">{item.createdDate}</p>
                        <p className="title">{item.title}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MagazineList