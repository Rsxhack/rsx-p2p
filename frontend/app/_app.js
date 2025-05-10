import Navbar from '../components/Navbar';
import '../styles/globals.css'; // make sure Tailwind is imported

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
