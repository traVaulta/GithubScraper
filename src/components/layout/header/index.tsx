import React from 'react';
import LogoImg from '../../../assets/app-logo.png';

export const AppHeader = () => (
    <header className="app-header app-header--outline">
        <div className="app-header app-header--sponsor">
            <img src={LogoImg} alt="Logo"/>
        </div>
        <div>Github Scraper</div>
    </header>
);
