# MattVinc Radio App

Welcome to **MattVinc Radio**, a modern, responsive radio streaming web app built with React and TypeScript. Tune in to thousands of live radio stations across the globe — search by country, station, or genre — all in one smooth UI experience.


---

## 📸 Preview

![MattVinc Radio UI Preview](./preview.png)

---

## 🚀 Features

* **Live Search** — Type to filter by country, station name, or tags.
* **Global Streaming** — Stream stations worldwide using [Radio Browser API](https://www.radio-browser.info/).
* **Station Info Panel** — Displays station name, location, tags, and logo.
* **Offline Reconnect Logic** — Automatically tries to reconnect when the network is back.
* **Debounced Input** — Optimized performance with lodash debounce.
* **Protected Routes** — Auth-based access to app via login/signup.
* **Responsive UI** — Fully optimized for mobile and desktop.
* **Hosted on Netlify** — Quick deploy and blazing fast delivery.

---

## Tech Stack

| Tech             | Purpose                            |
| ---------------- | ---------------------------------- |
| React            | Frontend framework                 |
| TypeScript       | Type-safe development              |
| React Router     | Page routing and protection        |
| Firebase Auth    | User authentication (Login/Signup) |
| RadioBrowser API | Fetch global radio stations        |
| CSS Modules      | Scoped styling for components      |
| Lodash Debounce  | Debounced search functionality     |

---

## Authentication

Uses Firebase for secure authentication:

* 🔑 Email/Password Signup
* 🔐 Login and token validation
* 🔄 Session persistence

---

## API Reference

All radio stations are fetched via:

> `https://de1.api.radio-browser.info/json/stations/search`

You can modify the query parameters to customize results (country, tag, name, codec, etc.)


---

## Author

**Matthew Vincent (Mathetis041)**
Frontend Developer | API Integrator | UX Thinker
📧 [matthewonuoha41@gmail.com](mailto:matthewonuoha41@gmail.com)
📍 Lagos, Nigeria

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## ⭐ Show Your Support

If you found this project helpful or inspiring:

* ⭐ Star this repo
* 💠 Use it as a template
* 🧥 Share your version
