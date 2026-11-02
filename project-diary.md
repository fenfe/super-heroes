Superheroes Tracker App using CRUD operations

Superhero Tracker MVP (Minimum Viable Product)

Description:
>> Build a single-page application that allows users to catalog superheroes,
 view their profiles, update their stats, and remove them from the registry.

 Jira Tickets (Full-Stack Node/Express + JSON File)

🎫 TICKET-1: Backend API Setup & Mock JSON

• Type: Task
• Description:
 Initialize the Node/Express server and set up the local JSON file database.

 • Acceptance Criteria:
	• Initialize project with npm init -y and install express.
	• Create a basic server.js file that starts an Express server on port 3000.
	• Create a superheroes.json file in the project root with the starter data provided below.
	• Serve static assets (your HTML/CSS/JS files) using express.static().

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


🎫 TICKET-2: [READ] API Route & Frontend Card Render

• Type: Feature
• Description:
 Create a backend GET route to read the heroes and use frontend JavaScript to fetch and display them.

• Acceptance Criteria:
	• Backend: Create a GET /api/superheroes route that reads superheroes.json using the 
    Node fs (File System) module and sends the data back.
	• Frontend: In your JS file, use fetch('/api/superheroes') to get the array.
	• Loop through the data and dynamically inject HTML "Hero Cards" into the DOM.

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


🎫 TICKET-3: [CREATE] Add New Superhero Form & POST API

• Type: Feature
• Description:
 Build a form to capture user input and send it to a backend POST route to save it.

• Acceptance Criteria:
	• Backend: Create a POST /api/superheroes route. It should accept a new hero object, read the existing JSON file, push the new hero into the array, and write it back to the file.
	• Frontend: Create an HTML form. Add a submit event listener in JS to intercept the form, collect inputs, and send them via fetch() using the POST method.
	• Clear the form inputs and re-render the hero cards upon successful submission.

 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

 
🎫 TICKET-4: [UPDATE] Edit Existing Hero Profiles

• Type: Feature
• Description:
 Provide a mechanism to edit data and save updates via a PUT route.

• Acceptance Criteria:
	• Backend: Create a PUT /api/superheroes/:id route. It finds the hero matching the ID parameter and updates their details in the JSON file.
	• Frontend: Add an "Edit" button to each card. Clicking it pre-fills the form with that hero's data.
	• When the form is submitted while in "edit mode," send a PUT request instead of a POST request.  

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


🎫 TICKET-5: [DELETE] Remove Hero from Registry

• Type: Feature
• Description: 
Delete a superhero using a DELETE route.

• Acceptance Criteria:
	• Backend: Create a DELETE /api/superheroes/:id route. It filters out the hero with the matching ID from the array and saves the updated array to the JSON file.
	• Frontend: Add a "Delete" button to each card. Clicking it triggers a confirm() dialogue. If accepted, send a DELETE request to the backend and remove the card from the UI.

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

  Tasking out
  The Frontend Steps:
1. User fills out the HTML form and clicks submit.
2. JS event listener intercepts the submit and runs e.preventDefault().
3. JS scrapes the values out of the input boxes and packages them into an object.
4. JS uses fetch('/api/superheroes', { method: 'POST', body: ... }) to send it to the backend.

The Backend Steps (Your Express Route):
5. Express intercepts the POST request.
6. The route reads database.json using fs.readFile().
7. JSON.parse() converts the raw text file back into a live JavaScript array.
8. The backend constructs a new superhero object, adding a generated unique ID to the user's input data.
9. The backend pushes this new object into the array.
10. JSON.stringify() converts the array back into string data.
11. fs.writeFile() saves the updated string over the old file.
12. The backend sends back a 201 Created status code to the frontend to confirm success.