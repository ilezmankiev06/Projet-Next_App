import "../styles/globals.css";
import Layout from "../components/layout";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <div className="home">
      <Head>
        <script
          src="https://kit.fontawesome.com/476c89e3e9.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <header>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </header>
      <style jsx>{`
        .home {
          background-image: url("https://github.com/MohirM/game-catalog-starter/blob/main/assets/images/background.jpeg?raw=true")
        }
      `}</style>
    </div>
  );
}

export default MyApp;
