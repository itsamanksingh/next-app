import { wrapper } from "@/store";
import "@/styles/globals.css";
import "@/styles/footer_dock_apps.css";
import "@/styles/DockApps.css";
import "@/styles/Header.css";
import "@/styles/card.css";
import "@/styles/SignInModel.css";
import "@/styles/SocialGoogleSignup.css";
import { Provider } from "react-redux";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

function App({ Component, pageProps }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <div className={poppins.variable}>
        <Component {...props.pageProps} />
      </div>
    </Provider>
  );
}

export default wrapper.withRedux(App);
