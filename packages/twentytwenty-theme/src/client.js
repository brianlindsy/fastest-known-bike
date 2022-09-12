import Theme from "./components";
import image from "@frontity/html2react/processors/image";
import link from "@frontity/html2react/processors/link";

const isMobile = window.innerWidth <= 768;

const twentyTwentyTheme = {
  name: "@frontity/twentytwenty-theme",
  roots: {
    /**
     *  In Frontity, any package can add React components to the site.
     *  We use roots for that, scoped to the `theme` namespace.
     */
    theme: Theme,
  },
  state: {
    isMobile: isMobile,
    /**
     * State is where the packages store their default settings and other
     * relevant state. It is scoped to the `theme` namespace.
     */
    auth: {
      isAuthenticated: false,
      user: {
        id: '',
        name: '',
        email: ''
      }
    },
    source: {
      data: {
        "/routes/": {
          isRoutes: true,
          isReady: true
        },
        "/submit-route/": {
          isSubmitRoute: true,
          isReady: true
        },
        "/submit-time/": {
          isSubmitTime: true,
          isReady: true
        },
        "/fastest-known-bike/": {
          isFastestKnownBike: true,
          isReady: true
        },
      }
    },
    theme: {
      colors: {
        gray: {
          base: "#6D6D6D",
          light: "#DCD7CA",
          lighter: "#F5EFE0",
        },
        primary: "#9fb6a2",
        headerBg: "#ffffff",
        footerBg: "#ffffff",
        bodyBg: "#f5efe0",
      },
      // Whether to show the search button in page header
      showSearchInHeader: false,
      // Menu links to display in the header
      menu: [],
      // State for the menu on mobile
      isMobileMenuOpen: false,
      // State for the search modal on mobile
      isSearchModalOpen: false,
      // Whether to show all post content or only excerpt (summary) in archive view
      showAllContentOnArchive: false,
      // Settings for the featured media (image or video)
      featuredMedia: {
        // Whether to show it on archive view
        showOnArchive: true,
        // Whether to show it on post
        showOnPost: true,
      },
      // Whether to auto-fetch links on a page. Values can be "no" | "all" | "in-view" | "hover"
      autoPrefetch: "in-view",

      /**
       * At the moment, we only include the ascii characters of Inter font.
       * Values can be "us-ascii" | "latin" | "all".
       */
      fontSets: "all",
    },
  },

  /**
   * Actions are functions that modify the state or deal with other parts of
   * Frontity like libraries.
   */
  actions: {
    auth: {
      setUser: ({state}) => user => {
        state.auth.user = user;
      },
      setIsAuthenticated: ({state}) => isAuthenticated => {
        state.auth.isAuthenticated = isAuthenticated;
      },
      setUserFullName: ({state}) => name => {
        state.auth.user.name = name;
      },
      setUserId: ({state}) => id => {
        state.auth.user.id = id;
      },
      setUserEmail: ({state}) => email => {
        state.auth.user.email = email;
      }
    },
    theme: {
      openMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = true;
      },
      closeMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = false;
      },
      openSearchModal: ({ state }) => {
        state.theme.isSearchModalOpen = true;
      },
      closeSearchModal: ({ state }) => {
        state.theme.isSearchModalOpen = false;
      },
    },
  },
  libraries: {
    source: {
      handlers: [
        {
          pattern: "/routes/:id",
          func: ({state, link, params}) => {
            state.source.data[link] = {
              isRoute: true,
              id: params.id
            }
          }
        }
      ]
    },
    html2react: {
      /**
       * Add a processor to `html2react` so it processes the `<img>` tags
       * and internal link inside the content HTML.
       * You can add your own processors too.
       */
      processors: [image, link],
    },
  },
};

export default twentyTwentyTheme;
