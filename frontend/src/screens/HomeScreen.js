import { Link } from 'react-router-dom';
import InlineForm from '../components/InlineForm';
import Video from '../components/Video';

const HomeScreen = (props) => {

  return (
    <>
      <header className="home">
        <Video title="hero" />

        <div className="home__inner">
          <div className="d-flex min-vh-100">
            <div className="m-auto w-50 text-center">
              <h1 className="mb-0 font-weight-normal text-center">Find an expert tutor.</h1>

              <h4 className="text-center font-weight-lighter font-smaller m-3 h5">Private, 1–on–1 lessons with the expert instructor of your choice. <span className="d-none d-md-inline-block">Decide how much you pay and who you want to work with. The choice is yours.</span></h4>

              <div className="d-inline-block text-left">
                <small className="mb-1 d-inline-block">What would you like to learn ?</small>
                <InlineForm placeholderText="Enter a subject" buttonText="GET HELP" />
              </div>

            </div>
          </div>


          <div className="row home__scroll">
            <div className="col col-md-6 m-auto text-center">
              <a href="#getting-help" className="btn btn-outline-primary border-0 text-white home__btn">
                <span className="home__scroll-text px-3 d-inline-block">See how personalized learning – in-person – can work for you</span>
                <i className="fa fa-chevron-down home__scroll-icon"></i>
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="row mb-4 dropdown">
        <nav className="dropdown__nav col" role="navigation">
          <ul className="dropdown__ul w-100 container mx-auto d-flex justify-content-center">
            <li className="dropdown__li">
              <Link className="dropdown__link dropdown__link--main" to="/">One</Link>
              <ul className="dropdown__ul dropdown__menu">
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-1</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-2</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-3</Link>
                </li>
              </ul>
            </li>
            <li className="dropdown__li">
              <Link className="dropdown__link dropdown__link--main" to="/">Two</Link>
              <ul className="dropdown__ul dropdown__menu">
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-1</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-2</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-3</Link>
                </li>
              </ul>
            </li>
            <li className="dropdown__li">
              <Link className="dropdown__link dropdown__link--main" to="/">Three</Link>
              <ul className="dropdown__ul dropdown__menu">
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-1</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-2</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-3</Link>
                </li>
              </ul>
            </li>
            <li className="dropdown__li">
              <Link className="dropdown__link dropdown__link--main" to="/">Four</Link>
              <ul className="dropdown__ul dropdown__menu">
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-1</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-2</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-3</Link>
                </li>
              </ul>
            </li>
            <li className="dropdown__li">
              <Link className="dropdown__link dropdown__link--main" to="/">Five</Link>
              <ul className="dropdown__ul dropdown__menu">
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-1</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-2</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-3</Link>
                </li>
              </ul>
            </li>
            <li className="dropdown__li">
              <Link className="dropdown__link dropdown__link--main" to="/">Six</Link>
              <ul className="dropdown__ul dropdown__menu">
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-1</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-2</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-3</Link>
                </li>
              </ul>
            </li>
            <li className="dropdown__li">
              <Link className="dropdown__link dropdown__link--main" to="/">Seven</Link>
              <ul className="dropdown__ul dropdown__menu">
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-1</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-2</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-3</Link>
                </li>
              </ul>
            </li>
            <li className="dropdown__li">
              <Link className="dropdown__link dropdown__link--main" to="/">Eight</Link>
              <ul className="dropdown__ul dropdown__menu">
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-1</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-2</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-3</Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </section>

      <div id="getting-help" className="row mt-5 mb-5">
        <div className="col">
          <h2 className="mb-0 text-dark font-weight-normal h1 text-center">Getting help is easier than you think.</h2>
        </div>
      </div>

      <section className="how-it-works container">
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="circle-icon mb-4">
              <h2 className="circle-icon__content">1</h2>
            </div>
            <div>
              <h4 className="font-weight-normal text-dark">TELL US WHERE YOU’RE STRUGGLING</h4>
              <p className="mt-0 mb-4 text-dark">Connect with experts in more than 300 skills and subjects.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="circle-icon mb-4">
              <h2 className="circle-icon__content">2</h2>
            </div>
            <div>
              <h4 className="font-weight-normal text-dark">CHOOSE THE TUTOR YOU WANT</h4>
              <p className="mt-0 mb-4 text-dark">Search online for a tutor with the right qualifications and hourly rates.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="circle-icon mb-4">
              <h2 className="circle-icon__content">3</h2>
            </div>
            <div>
              <h4 className="font-weight-normal text-dark">BOOK YOUR LESSON</h4>
              <p className="mt-0 mb-4 text-dark">Tell your tutor when you’d like to meet, and only pay for the time you need.</p>
            </div>
          </div>
        </div>

        <div className="row text-center">
          <div className="col w-100  col-12 text-center mb-0">
            <Link to="/" className="btn btn-primary btn-lg mb-4">get started</Link>
          </div>
          <div className="col w-100 col-12 text-center mb-5">
            <Link to="/" className="text-dark font-weight-light text-center">Learn more about what 1–to–1 lessons can do for you. &#8594;	 </Link>
          </div>
        </div>
      </section>


      <section className="value-props bg-light mt-5">
        <div className="container">

          <div className="row text-center">
            <div className="col-12 text-center mt-5 px-xl-5 px-2">
              <h2 className="mb-0 font-weight-light h1 my-5 px-lg-5 px-2">Learn from the nation’s largest community of professional tutors.</h2>
            </div>
            <div className="col-12 text-center">
              <div className="row">
                <div className="col-md-4">
                  <i className="fa fa-users value-props__icon mb-4"></i>
                  <h4 className="font-weight-normal">VETTED EXPERTS.</h4>
                  <p className="m-0">More qualified instructors than anywhere else, ready to help.</p>
                </div>
                <div className="col-md-4">
                  <i className="fa fa-puzzle-piece value-props__icon mb-4"></i>
                  <h4 className="font-weight-normal">THE RIGHT FIT.</h4>
                  <p className="m-0">Find an expert who suits your needs and learning style.</p>
                </div>
                <div className="col-md-4">
                  <i className="fa fa-pie-chart value-props__icon mb-4"></i>
                  <h4 className="font-weight-normal">REAL RESULTS.</h4>
                  <p className="m-0">Reach your goals faster with private, 1–to–1 lessons.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <div className="row py-5 bg-light">
        <div className="col-12 container text-center mt-3">
          <h2 className="mb-0 h3 text-dark font-weight-light text-center">Find a Tutor Nearby for In-Person Tutoring Services</h2>
        </div>

        <nav className="dropdown__nav col-12" role="navigation">
          <ul className="dropdown__ul dropdown__ul--border-less w-100 container mx-auto d-flex justify-content-center">
            <li className="dropdown__li">
              <Link className="dropdown__link dropdown__link--main" to="/">Islamabad</Link>
              <ul className="dropdown__ul dropdown__menu">
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-1</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-2</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-3</Link>
                </li>
              </ul>
            </li>
            <li className="dropdown__li">
              <Link className="dropdown__link dropdown__link--main" to="/">Lahore</Link>
              <ul className="dropdown__ul dropdown__menu">
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-1</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-2</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-3</Link>
                </li>
              </ul>
            </li>
            <li className="dropdown__li">
              <Link className="dropdown__link dropdown__link--main" to="/">Karachi</Link>
              <ul className="dropdown__ul dropdown__menu">
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-1</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-2</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-3</Link>
                </li>
              </ul>
            </li>
            <li className="dropdown__li">
              <Link className="dropdown__link dropdown__link--main" to="/">Attock</Link>
              <ul className="dropdown__ul dropdown__menu">
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-1</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-2</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-3</Link>
                </li>
              </ul>
            </li>
            <li className="dropdown__li">
              <Link className="dropdown__link dropdown__link--main" to="/">Peshawar</Link>
              <ul className="dropdown__ul dropdown__menu">
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-1</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-2</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-3</Link>
                </li>
              </ul>
            </li>
            <li className="dropdown__li">
              <Link className="dropdown__link dropdown__link--main" to="/">Wah</Link>
              <ul className="dropdown__ul dropdown__menu">
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-1</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-2</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-3</Link>
                </li>
              </ul>
            </li>
            <li className="dropdown__li">
              <Link className="dropdown__link dropdown__link--main" to="/">Kashmir</Link>
              <ul className="dropdown__ul dropdown__menu">
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-1</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-2</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-3</Link>
                </li>
              </ul>
            </li>
            <li className="dropdown__li">
              <Link className="dropdown__link dropdown__link--main" to="/">Sargoda</Link>
              <ul className="dropdown__ul dropdown__menu">
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-1</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-2</Link>
                </li>
                <li className="dropdown__li dropdown__menu-item">
                  <Link className="dropdown__link dropdown__link--sub" to="/">Sub-3</Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>

      <section className="guarantee">
        <div className="row">
          <div className="col-md-8 my-5 mx-auto py-3 px-2">
            <Link className="d-flex flex-wrap align-items-center justify-content-center guarantee__link w-100" to="/" target="_blank">
              <img className="img-fluid guarantee__img" src="/img/good-fit.png" alt="Guaranteed Tutors" />
              <div className="mt-0 ml-md-4 ml-0 text-lg-left text-center">
                <h2 className="text-white font-weight-light">Find the right fit or it’s free.</h2>
                <p className="text-white">We guarantee you’ll find the right tutor, or we’ll cover the first hour of your lesson.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>


      <section className="trending-courses bg-light">
        <div className="row">
          <div className="col-md-6 trending-courses__img-container">
            <img className="d-block img-fluid trending-courses__img" src="/img/trending-courses.jpg" alt="Trending Courses" />
          </div>
          <div className="col-md-6 pt-5 text-center">
            <h1 className="trending-courses__heading font-weight-light">You’ve got this.</h1>
            <p className="trending-courses__para small m-0">Get expert help in any skill or subject.</p>
            <div className="row text-center text-uppercase mt-5">
              <div className="col-12 mb-4">
                <Link className="font-weight-light" to="/">
                  <h5 className="trending-courses__title">Algebra &#8594;</h5>
                </Link>
              </div>
              <div className="col-12 mb-4">
                <Link className="font-weight-light" to="/">
                  <h5 className="trending-courses__title">Chemistry &#8594;</h5>
                </Link>
              </div>
              <div className="col-12 mb-4">
                <Link className="font-weight-light" to="/">
                  <h5 className="trending-courses__title">JavaScript &#8594;</h5>
                </Link>
              </div>
              <div className="col-12 mb-4">
                <Link className="font-weight-light" to="/">
                  <h5 className="trending-courses__title">ReactJS &#8594;</h5>
                </Link>
              </div>
              <div className="col-12 mb-4">
                <Link className="font-weight-light" to="/">
                  <h5 className="trending-courses__title">Node.js &#8594;</h5>
                </Link>
              </div>
              <div className="col-12 mb-4">
                <Link className="font-weight-light" to="/">
                  <h5 className="trending-courses__title">MongoDB &#8594;</h5>
                </Link>
              </div>
              <div className="col-12 mb-4">
                <Link className="font-weight-light" to="/">
                  <h5 className="trending-courses__title">Mongoose &#8594;</h5>
                </Link>
              </div>
              <div className="col-12 mb-4">
                <Link className="font-weight-light" to="/">
                  <h5 className="trending-courses__title">Redux &#8594;</h5>
                </Link>
              </div>
              <div className="col-12 mb-4">
                <Link className="font-weight-light" to="/">
                  <h5 className="trending-courses__title">ExpressJS &#8594;</h5>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="become-a-tutor py-5">
        <div className="row text-center py-5">

          <div className="col py-3">
            <div className="container">
              <h1 className="mb-4 text-white font-weight-light">Start tutoring with us today.</h1>
              <p className="text-white mb-3">We’re always looking for talented tutors. Set your own rate, get paid and make a difference.</p>
            </div>
            <Link to="/users/signup" className="btn btn-outline-light btn-lg">Apply today</Link>
          </div>

        </div>
      </section>
    </>
  );
};


export default HomeScreen;



