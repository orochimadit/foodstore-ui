import * as React from 'react';
import { 
    SideNav, 
    LayoutSidebar,
    Responsive,
    CardProduct,
    Pagination } from 'upkit';
import { useDispatch, useSelector } from 'react-redux';
import menus from './menu';
import TopBar from '../../components/TopBar';
import { config } from '../../config';
import { 
    fetchProducts,
    setPage,
    goToNextPage,
    goToPrevPage } from '../../features/Products/actions';
import { BounceLoader } from 'react-spinners';

export default function Home(){

    let dispatch = useDispatch();
    let products = useSelector(state =>state.products);
    React.useEffect(() =>{
        dispatch(fetchProducts());
    },[ dispatch,products.currentPage])
    return(
        <div>
            <LayoutSidebar
                sidebar={<SideNav items={menus} verticalAlign="top" />}
                content = {<div className="md:flex w-full mr-5 h-full min-h-screen">
                    <div className="w-full md:w-3/4 pl-5 pb-10">
                       <TopBar/>

                       {products.status ==='process' && !products.data.length?
                        <div className="flex justify-center">
                            <BounceLoader color="red"/>
                        </div> 
                        : null}
                       <Responsive desktop={3} items="stretch"> 
                            {products.data.map((product, index)=>{
                                return<div key={index} className="p-2">
                                    <CardProduct 
                                        title={product.name}
                                        //imgUrl={`$config.api_host/upload/${product.image_url}`}
                                        imgUrl={`${config.api_host}/upload/${product.image_url}`}
                                        price={product.price}
                                        onAddToCart={_ =>null}
                                        />
                                </div>
                            })}
                       </Responsive>

                       <div className="text-center my-10">
                           <Pagination
                            totalItems={products.totalItems}
                            page={products.currentPage}
                            perPage={products.perPage}
                            onChange={page => dispatch(setPage(page))}
                            onNext={_ =>dispatch(goToNextPage())}
                            onPrev={_ =>dispatch(goToPrevPage)}
                           />
                       </div>
                    </div>
                    <div className="w-full md:w-1/4 h-full shadow-lg border-rborder-white bg-gray-100">
                        Keranjang belanja di sini
                    </div>
                </div>}
                sidebarSize= {80}
            />
        </div>
    )
}