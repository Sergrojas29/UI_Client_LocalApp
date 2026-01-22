# Tauri + React + Typescript

This template should help get you started developing with Tauri, React and Typescript in Vite.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)


For linux install Node Manger

Step 1: Install curl
```
sudo apt update
sudo apt install curl -y

```

Step 2: Download and Install NVM
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

```

Step 3: Refresh Your Terminal (Crucial!)

Step 4: Install Node.js

```
nvm install --lts
```

Step 5: Verify
Check that everything is working. You should see version numbers for both.


```node -v
npm -v
```


**Step 1: Install Rust**
Run this command to install Rust and Cargo via rustup (the official installer):


```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh  
```
When prompted, press 1 to proceed with the default installation.

**Crucial :** Once it finishes, run this command to refresh your current terminal session (or close and reopen the terminal):


**Step 2: Install Linux System Dependencies**

Tauri on Linux also needs specific system libraries (like WebKit for rendering the UI and GTK for window management). You likely need these as well, or the build will fail after you fix the Rust error.

Run this single command to install them all:


```sudo apt update
sudo apt install libwebkit2gtk-4.1-dev \
  build-essential \
  curl \
  wget \
  file \
  libssl-dev \
  libgtk-3-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev
  ```

**Step 3: Verify and Run**

Check if Cargo is recognized now:

```
cargo --version
```