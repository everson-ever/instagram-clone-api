import React from 'react';

import './styles.css';

const Home = () => {
    return (
        <section className="box-content">
            <div className="box-phone">
                <img alt="phones presentation" src={process.env.PUBLIC_URL + '/phone.png'} />
            </div>
            <div className="box-form">

                <form>

                </form>
            </div>
        </section>
    );
};

export default Home;