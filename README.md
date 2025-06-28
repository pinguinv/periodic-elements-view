# Periodic Elements View 🌟

A simple, interactive table displaying data about periodic elements.  🧪

## Features ✨

* **Data Loading Simulation** 📡: Mimics fetching data from a server.
* **Editable Fields** ✏️: Edit all fields of each periodic element with ease.
* **Field Filtering** 🔍: Filters across all fields, updating 2 seconds after input changes.
* **Theme Toggle** 🌗: Switch between light and dark themes effortlessly.

## Tools & Technologies 🛠️

* [Angular 20](https://angular.dev/) 🚀
* [Angular Material Components](https://material.angular.dev/) 🎨
* [NgRx Signal Store](https://ngrx.io/guide/signals/signal-store) 📦
* [Tailwind CSS](https://tailwindcss.com/) 💅
* [Nx](https://nx.dev/) & [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) ⚡

## Project Setup ⚙️

To install dependencies, use the `--legacy-peer-deps` flag to avoid npm errors. Note that `@ngrx/signals@19.2.1` is not yet updated for Angular 20 but works fine. [Learn more about this issue »](https://github.com/ngrx/platform/issues/4787)

```bash
npm install --legacy-peer-deps
```

## Run Development Server 🖥️

Launch the development server with:

```bash
nx serve
```

## Build the Project 🏗️

Create a production build with:

```bash
nx build
```
