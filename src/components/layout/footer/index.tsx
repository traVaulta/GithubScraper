import React from 'react';

const AppFooter = () => (
    <footer className="app-footer app-footer--outline">
        <div>
            &copy;GithubScraper, Croatia, 2020
        </div>
        <div className="app-footer app-footer--contact">
            <a href="mailto:matijacvrk@gmail.com">matijacvrk@gmail.com</a>
        </div>
    </footer>
);

const Footer = React.memo(AppFooter);

export default Footer;
