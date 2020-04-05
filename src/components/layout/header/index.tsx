import React from 'react';
import SponsorImg from '../../../assets/powered-by.png';
import LogoImg from '../../../assets/app-logo.png';

const AppHeader = () => (
    <header className="app-header app-header--outline">
        <div className="app-header app-header--sponsor">
            <img src={LogoImg} alt="Logo"/>
            <img src={SponsorImg} alt="powered-by-rimac"/>
        </div>
        <div>Github Scraper</div>
    </header>
);

const Header = React.memo(AppHeader);

export default Header;
