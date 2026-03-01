import React from "react";
import { Outlet } from "react-router-dom";
import GlobalNavbar from "./GlobalNavbar";

const Layout = () => {
    return (
        <>
            <GlobalNavbar />
            <div style={{ paddingTop: "0px", position: "relative" }}>
                {/* We keep paddingTop at 0 because the pages (Home, Showcase, Store) are supposed to take up the full screen including behind the navbar, but since navbar is fixed and uses a top gradient, it sits gracefully on top. */}
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
