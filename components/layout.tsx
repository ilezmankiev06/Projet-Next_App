import React from "react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
          crossOrigin="anonymous"
        ></link>
        <script src="https://kit.fontawesome.com/476c89e3e9.js" crossOrigin="anonymous"></script>
      </Head>
      <header>
        <div className="nav">
          <nav className="fixed-top navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                <img src="/1980.png" width="50" height="50" />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="/games"
                    >
                      <i className="fas fa-gamepad">Games</i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="/platforms">
                      <i className="fab fa-playstation">Platforms</i>
                    </a>
                  </li>
                </ul>
                <div className="container-fluid">
                  <form className="d-flex">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <button className="btn btn-outline-success" type="submit">
                      Search
                    </button>
                  </form>
                </div>
              </div>
              <style jsx>{`
                .d-flex {
                  display: block;
                  float: right;
                }
              `}</style>
            </div>
          </nav>
          
        </div>
        
      </header>
      
      <main>{children}</main>
      
      <br />
      <br />
      <footer
        className="footer text-center"
        style={{ background: "black", color: "white" }}
      >
        © 2021 Ilez Mankiev
      </footer>
    </div>
  );
};

export default Layout;
