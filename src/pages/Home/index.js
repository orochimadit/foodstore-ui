import * as React from 'react';
import { SideNav, LayoutSidebar } from 'upkit';
import menus from './menu';

export default function Home(){
    return(
        <div>
            <LayoutSidebar
                sidebar={<SideNav items={menus} verticalAlign="top" />}
                content = {<div className="md:flex w-full mr-5 h-full min-h-screen">
                    <div className="w-full md:w-3/4 pl-5 pb-10">
                        Konten utama disini
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