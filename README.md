# UnifySpace

Clean partitioned website version with:

- Plan selection
- Role selection popup
- Role-specific dashboards
- Calendar folder
- Roles folder

## Folder structure

- `index.html` - main website page and dashboard
- `html/terms.html` - full Terms & Conditions page
- `css/style.css` - main design and layout code
- `js/script.js` - main dashboard features
- `calendar/calendar.html` - separate calendar page
- `calendar/calendar.css` - calendar styling
- `calendar/calendar.js` - calendar logic
- `roles/roles.html` - role modal HTML reference
- `roles/roles.css` - role popup and role dashboard styling
- `roles/roles.js` - role selection and role functions
- `images/` - put your images/logo here
- `.vscode/launch.json` - optional VS Code launch config

## How it works

1. Open `index.html`.
2. Click any plan: Free, Pro, Team, or Enterprise.
3. A popup asks you to select a role.
4. Choose IT, Business, Engineering, or Design.
5. The dashboard opens with role-specific functions.

## Role functions

### IT
- AI Coding Assistant
- Git Push/Pull
- Built-in Repository
- Code Editor

### Business
- Excel Integration
- Flowchart Builder
- Business Model Canvas
- AI Analytics

### Engineering
- AutoCAD Support
- Simulation Tools
- Technical Drawings
- Project Files

### Design
- UI/UX Tools
- Graphics Editor
- Prototype Builder
- Asset Library

## How to run

Open `index.html` in your browser, or use VS Code Live Server.

## Run with XAMPP

1. Copy the folder into `C:\xampp\htdocs`.
2. Start Apache in XAMPP.
3. Open `http://localhost/UnifySpace-with-roles-calendar/` in your browser.
