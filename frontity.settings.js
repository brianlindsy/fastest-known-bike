const settings = {
  "name": "fastest-known-bike-twenty-twenty",
  "state": {
    "frontity": {
      "url": "https://test.frontity.org",
      "title": "Fastest Known Bike",
      "description": "The people, times and stories behind the best bike routes"
    }
  },
  "packages": [
    {
      "name": "@frontity/twentytwenty-theme",
      "state": {
        "theme": {
          "menu": [
            [
              "Home",
              "/"
            ],
            [
              "Routes",
              "/routes/"
            ],
            [
              "FKB",
              "/fastest-known-bike/"
            ],
            [
              "Submit a route",
              "/submit-route/"
            ],
            [
              "Submit a time",
              "/submit-time/"
            ],
            [
              "Guidelines",
              "/guidelines/"
            ],
            [
              "Blog",
              "/category/blog/"
            ],
            [
              "About Us",
              "/about-us/"
            ],
          ],
          "featured": {
            "showOnList": false,
            "showOnPost": false
          }
        }
      }
    },
    {
      "name": "@frontity/wp-source",
      "state": {
        "source": {
          "url": "https://cms.fastestknownbike.com/",
          "homepage": "/welcome-to-fastest-known-bike"
        }
      }
    },
    {
      "name": "@frontity/google-analytics",
      "state": {
        "googleAnalytics": {
          "trackingId": "G-MCG54BD1HR",
        },
      },
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
    "@aws-amplify",
    "@aws-sdk",
  ]
};

export default settings;
