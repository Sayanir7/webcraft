# ProductDev_Kriti_25

# WebCraft  

## Table of Contents  
- [Project Overview](#project-overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)    
- [Hosted Server](#hosted-server)  
- [Demo](#demo) 
- [Screenshots](#screenshots) 
- [Installation Locally](#installation-locally)  
  - [Backend Setup](#backend-setup)  
  - [Frontend Setup](#frontend-setup)  
- [Working of the Website](#working-of-the-website)  

## Project Overview  
WebCraft is an AI-powered website builder that allows users to generate, edit, and customize websites effortlessly. The platform provides a text-to-website generation feature alongside a drag-and-drop editor for intuitive design modifications.  

## Features  
- **AI-Powered Website Generation** – Generate structured and responsive websites from user prompts.  
- **Drag-and-Drop Editor** – Modify elements using a no-code interface powered by **GrapesJS**.  
- **Live Preview and Code Editor** – View and edit code alongside a real-time preview.  
- **Version Control** – Edit different versions of generated code.  
- **Save and Download** – Save website versions and download the generated code.  
- **Chat Sidebar** – Manage previous interactions with an organized chat history.  
- **User Personalization** – Customize website preferences and editor settings.  
- **Profile Page** – View and manage account details.  
- **Delete Functionality** – Remove individual chats, delete all chats, or delete the account.  

## Tech Stack  
- **Frontend:** React, Vite, Tailwind CSS  
- **Backend:** Node.js, Express.js, MongoDB  
- **Authentication:** JWT (JSON Web Tokens)  
- **Editor:** GrapesJS  
- **State Management:** Redux Toolkit  

## Hosted Server  
**[WebCraft Live (Vercel Deployment)](your-vercel-link-here)**  

## Demo  
**[Link to Demo](your-drive-link-here)**  

## Screenshots  
*(Include screenshots of the UI, editor, and AI-generated websites here.)* 

## Installation Locally  

### Prerequisites  
- Install **Node.js** and **npm** on your local machine.
```bash
git clone https://github.com/p1mple07/ProductDev_Kriti_25.git
cd ProductDev_Kriti_25
```

### Backend Setup  
```bash
cd backend  
npm install 
```
-Create a .env file in the backend directory and add the following:
```
MONGO=your_mongodb_uri  
JWT_SECRET=your_jwt_secret  
```
- Run the backend server:
``` bash
npm run start 
```
### Frontend Setup
```bash
cd ..  
cd frontend  
npm install  
```
- Create a .env.local file in the frontend directory and add:
```bash
VITE_GEMINI_API_KEY=your_gemini_api_key  
```
- Run the frontend server:
```bash
npm run dev  
```

## Working of the Website
- Text-to-Website Generation – Users input a prompt, and the AI generates HTML, CSS, and JavaScript code.
- Code and Preview Display – The generated code appears alongside a real-time preview.
- Drag-and-Drop Editing – Users can modify the structure and design using GrapesJS.
- Version Control – Different versions of the website can be edited and managed.
- Saving and Downloading – Users can save versions and download the generated website files.
- Chat Management – The chat sidebar maintains past interactions, allowing users to revisit previous requests.
- Account and Profile Management – Users can personalize settings, delete chats, or remove their accounts.
