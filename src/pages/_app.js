import "@/styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";


function App({ Component, pageProps }) {
  return (
    <UserProvider session={pageProps.session}>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default App;
