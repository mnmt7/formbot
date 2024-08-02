import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";
import designLeft from "../../assets/design-left.svg";
import designRight from "../../assets/design-right.svg";
import formbotDemo1 from "../../assets/formbot-demo-1.png";
import companies from "../../assets/companies.svg";
import feature1 from "../../assets/feature-1.png";
import feature2 from "../../assets/feature-2.png";
import platforms from "../../assets/platforms.svg";
import formbotDemo2 from "../../assets/formbot-demo-2.png";
import welcomeImg from "../../assets/welcome.png";
import meImg from "../../assets/me.png";
import tickIcon from "../../assets/tick.svg";
import crossIcon from "../../assets/cross.svg";
import tryImg from "../../assets/try.svg";

import classes from "./Home.module.css";
import Features from "../../components/Features/Features";

const newTabIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="white"
    height="16px"
    width="16px"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
    />
  </svg>
);

const productLinks = [
  {
    name: "Status",
    path: "/",
    newTab: true,
  },
  {
    name: "Documentation",
    path: "/",
    newTab: true,
  },
  {
    name: "Roadmap",
    path: "/",
    newTab: true,
  },
  {
    name: "Pricing",
    path: "/",
  },
];

const communityLinks = [
  {
    name: "Discord",
    path: "/",
    newTab: true,
  },
  {
    name: "GitHub repository",
    path: "/",
    newTab: true,
  },
  {
    name: "Twitter",
    path: "/",
    newTab: true,
  },
  {
    name: "LinkedIn",
    path: "/",
    newTab: true,
  },
  {
    name: "OSS Friends",
    path: "/",
  },
];

const companyLinks = [
  {
    name: "About",
    path: "/",
  },
  {
    name: "Contact",
    path: "/",
  },
  {
    name: "Terms of Service",
    path: "/",
  },
  {
    name: "Privacy Policy",
    path: "/",
  },
];

export default function Home() {
  return (
    <div className={classes.home}>
      <header className={`${classes.header} ${classes.container}`}>
        <img src={logo} className={classes.logo} />
        <h1 className={classes.logoHeading}>Formbot</h1>
        <nav className={classes.nav}>
          <ul className={classes.links}>
            <li>
              <Link to="/login" className={classes.signin}>
                Sign in
              </Link>
            </li>
            <li>
              <Link to="/formbot/new" className={classes.register}>
                Create a FormBot
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <div className={classes.section1}>
          <div className={classes.section2ImgContainer}>
            <img className={classes.section2Img} src={designLeft} alt="" />
          </div>
          <div className={classes.section1Main}>
            <h2 className={classes.section1Heading}>
              Build advanced chatbots
              <br />
              visually
            </h2>
            <p className={classes.section1Description}>
              Typebot gives you powerful blocks to create unique chat
              experiences. Embed them anywhere on your web/mobile apps and start
              collecting results like magic.
            </p>

            <Link
              to="/formbot/new"
              className={`${classes.register} ${classes.registerBig}`}
            >
              Create a FormBot for free
            </Link>
          </div>
          <div className={classes.section2ImgContainer}>
            <img className={classes.section2Img} src={designRight} alt="" />
          </div>
        </div>

        <img src={formbotDemo1} alt="" className={classes.formbotDemo1Img} />

        <div className={`${classes.section3} ${classes.container}`}>
          <h2 className={classes.sectionHeading1}>
            Replace your old school forms <br /> with <br /> chatbots
          </h2>
          <p className={classes.sectionDescription}>
            Typebot is a better way to ask for information. It leads to an
            increase in customer satisfaction and retention and multiply by 3
            your conversion rate compared to classical forms.
          </p>

          <div className={`${classes.section3Main}`}>
            <img
              src={crossIcon}
              className={classes.crossIcon}
              alt="Tick Icon"
            />
            <img src={tickIcon} className={classes.tickIcon} alt="Cross Icon" />
            <img
              src={tryImg}
              className={classes.tryImg}
              alt="Try it out text"
            />
            <form className={classes.section3MainSection}>
              <p className={classes.inputContainer}>
                <label className={classes.label}>
                  Full name <span className={classes.redAsterisk}>*</span>
                </label>
                <input
                  className={classes.formInput}
                  type="text"
                  placeholder="Full name"
                />
              </p>

              <p className={classes.inputContainer}>
                <label className={classes.label}>
                  Email <span className={classes.redAsterisk}>*</span>
                </label>
                <input
                  className={classes.formInput}
                  type="text"
                  placeholder="Email"
                />
              </p>

              <div>
                <p className={classes.label}>
                  What services are you interested in?
                  <span className={classes.redAsterisk}>*</span>
                </p>
                <p className={classes.checkboxContainer}>
                  <input
                    className={classes.checkbox}
                    type="checkbox"
                    value="websiteDev"
                  />
                  <span className={classes.checkmark}></span>
                  <label className={classes.label}>Website Dev</label>
                </p>

                <p className={classes.checkboxContainer}>
                  <input
                    className={classes.checkbox}
                    type="checkbox"
                    value="contentMarketing"
                  />
                  <span className={classes.checkmark}></span>

                  <label className={classes.label}>Content Marketing</label>
                </p>

                <p className={classes.checkboxContainer}>
                  <input
                    className={classes.checkbox}
                    type="checkbox"
                    value="socialMedia"
                  />
                  <span className={classes.checkmark}></span>

                  <label className={classes.label}>Social Media</label>
                </p>

                <p className={classes.checkboxContainer}>
                  <input
                    className={classes.checkbox}
                    type="checkbox"
                    value="uxUiDesign"
                  />
                  <span className={classes.checkmark}></span>

                  <label className={classes.label}>UX/UI Design</label>
                </p>
              </div>
              <p className={classes.inputContainer}>
                <label className={classes.label}>Additional information</label>
                <textarea
                  className={`${classes.formInput} ${classes.description}`}
                  placeholder="Additional information"
                ></textarea>
              </p>

              <button className={classes.submitBtn}>Submit</button>
            </form>
            <div
              className={`${classes.section3MainSection2} ${classes.section3MainSection}`}
            >
              <img src={meImg} alt="" />
              <div className={classes.messages}>
                <p className={classes.messageTxt}>
                  Welcome to <strong>AA</strong> (Awesome Agency)
                </p>
                <p className={classes.messageTxt}>
                  <img src={welcomeImg} alt="" />
                </p>
                <p className={classes.hiTxt}> Hi</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`${classes.section4} ${classes.container}`}>
          <div className={classes.section4SubSection}>
            <img className={classes.featuresImg} src={feature1} alt="" />
            <div>
              <h3 className={classes.sectionHeading2}>
                Easy building experience
              </h3>
              <p
                className={`${classes.sectionDescription} ${classes.section4Description}`}
              >
                All you have to do is drag and drop blocks to create your app.
                Even if you have custom needs, you can always add custom code.
              </p>
            </div>
          </div>

          <div className={classes.section4SubSection}>
            <div>
              <h3 className={classes.sectionHeading2}>Embed it in a click</h3>
              <p
                className={`${classes.sectionDescription} ${classes.section4Description}`}
              >
                Embedding your typebot in your applications is a walk in the
                park. Typebot gives you several step-by-step platform- specific
                instructions. Your typebot will always feel &quot;native&quot;.
              </p>
            </div>
            <img className={classes.featuresImg} src={feature2} alt="" />
          </div>
        </div>

        <div className={`${classes.section5} ${classes.container}`}>
          <img className={classes.platforms} src={platforms} alt="" />
          <div className={classes.section5TxtContainer}>
            <h2
              className={`${classes.sectionHeading2} ${classes.section5Heading}`}
            >
              Integrate with any platform
            </h2>
            <p
              className={`${classes.sectionDescription} ${classes.section5Description}`}
            >
              Typebot offers several native integrations blocks as well as
              instructions on how to embed typebot on particular platforms
            </p>
          </div>
        </div>

        <div className={classes.section6}>
          <div>
            <h2 className={classes.sectionHeading1}>
              Collect results in real-time
            </h2>
            <p
              className={`${classes.sectionDescription} ${classes.section6Description}`}
            >
              One of the main advantage of a chat application is that you
              collect the user&apos;s responses on each question. You won't lose
              any valuable data.
            </p>
          </div>
          <img
            className={classes.formbotDemo2}
            src={formbotDemo2}
            alt=""
            width={570}
            height={531}
          />
        </div>

        <div className={`${classes.section7} ${classes.container}`}>
          <h2 className={classes.sectionHeading2}>And many more features</h2>
          <p className={classes.sectionDescription}>
            Typebot makes form building easy and comes with powerful features
          </p>
          <Features />
        </div>

        <div className={classes.section2}>
          <h2 className={classes.section2Heading}>
            Loved by teams and creators from all around the world
          </h2>
          <img src={companies} alt="" />
        </div>

        <div className={classes.gradientColor}>
          <div className={`${classes.section8} ${classes.container}`}>
            <img src={designLeft} alt="" className={classes.designLeftImg} />
            <div className={classes.section8Main}>
              <h2 className={classes.sectionHeading2}>
                Improve conversion and user engagement with FormBots{" "}
              </h2>
              <Link
                to="/formbot/create"
                className={`${classes.register} ${classes.registerBig}`}
              >
                Create a FormBot
              </Link>
              <p className={classes.section8SmallTxt}>
                No trial. Generous <strong>free</strong> plan.
              </p>
            </div>
            <img src={designRight} alt="" className={classes.designRightImg} />
          </div>
        </div>
      </main>
      <footer className={classes.footer}>
        <div>
          <div className={classes.footerLogo}>
            <img src={logo} className={classes.logo} />
            <h1 className={classes.logoHeading}>Formbot</h1>
          </div>
          <p>
            Made with ❤️ by <br /> @cuvette
          </p>
        </div>

        <div>
          <p className={classes.footerLinksHeading}>Product</p>
          <ul className={classes.footerLinks}>
            {productLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  target={link.newTab ? "_blank" : "_self"}
                  className={classes.footerLink}
                >
                  {link.name}
                  {link.newTab && newTabIcon}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={classes.footerLinksHeading}>Community</p>
          <ul className={classes.footerLinks}>
            {communityLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  target={link.newTab ? "_blank" : "_self"}
                  className={classes.footerLink}
                >
                  {link.name}
                  {link.newTab && newTabIcon}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={classes.footerLinksHeading}>Company</p>
          <ul className={classes.footerLinks}>
            {companyLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  target={link.newTab ? "_blank" : "_self"}
                  className={classes.footerLink}
                >
                  {link.name}
                  {link.newTab && newTabIcon}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}
