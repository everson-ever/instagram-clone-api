import React from 'react';

import Phone from '../../components/Phone';
import Footer from '../../components/Footer';
import './styles.css';

import Appstore from '../../assets/images/image-app-store.png';
import Googleplay from '../../assets/images/image-google-play.png'

import PhoneImage1 from '../../assets/images/phone-image1.jpg';
import PhoneImage2 from '../../assets/images/phone-image2.jpg';
import PhoneImage3 from '../../assets/images/phone-image3.jpg';
import PhoneImage4 from '../../assets/images/phone-image4.jpg';
import PhoneImage5 from '../../assets/images/phone-image5.jpg';



const Login = () => {
    const images = [PhoneImage1, PhoneImage2, PhoneImage3, PhoneImage4, PhoneImage5];

    return (
        <div>
        <section className="box-content">
            <div className="phone-view">
                <Phone imagesView={images} />
            </div>

            <div className="box-form-info">
                <div className="box-form">
                    <div className="box-logo">
                    </div>

                    <form>
                        <div className="box-input">
                            <input autoComplete="off" type="email" name="email" placeholder="Phone number, username or email" />
                        </div>
                        <div className="box-input">
                            <input className="input-password" type="password" name="password" placeholder="password" />
                        </div>

                        <div className="box-button">
                            <button type="button" className="btn-login">Log In</button>
                        </div>
                    </form>

                    <div className="box-or">
                        <div className="line"></div>
                        <div className="or">Or</div>
                        <div className="line"></div>
                    </div>

                    <span className="login-facebook">Log in with Facebook</span>


                    <div>
                        <a href="#f" className="forgot-password">Forgot password?</a>
                    </div>
                </div>

                <div className="box-signup">
                    <p>Don't have an account?</p>
                    <a href="#s">Sign up</a>
                </div>

                <div className="box-apps">
                    <h4 className="title-box-apps">Get the app</h4>

                    <div className="apps">
                        <div className="app">
                             <img alt="Faça download do app para IOS" src={Appstore} />
                        </div>
                        <div className="app">
                             <img alt="Faça download do app para Android" src={Googleplay} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
        </div>
    );
}

export default Login;