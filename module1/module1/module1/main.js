
// TASK 1: JavaScript Basics & Setup


// Log welcome message to the browser console
console.log("Welcome to the Community Portal");

// Alert the user when the page is fully loaded
window.onload = function () {
  alert("Welcome! The Community Portal has loaded successfully.");

  // Render event cards on page load (Task 7)
  renderEventCards();

  // Show default fee (already in script.js, but calling here too for safety)
  if (typeof showFee === "function") showFee();
};



// TASK 2: Syntax, Data Types, and Operators

// const for fixed event info, let for changeable seat count
const eventName = "Summer Music Festival";
const eventDate = "2026-07-15";
let availableSeats = 50;

// Template literal to combine event info
const eventInfo = `Event: ${eventName} | Date: ${eventDate} | Seats Available: ${availableSeats}`;
console.log("Event Info:", eventInfo);

// Increment seats (someone cancelled) and decrement (someone registered)
availableSeats++;  // now 51
console.log("After cancellation, seats:", availableSeats);

availableSeats--;  // back to 50
console.log("After registration, seats:", availableSeats);



// TASK 3: Conditionals, Loops, and Error Handling


// Sample event list (will also be used in later tasks)
const today = new Date();

const eventList = [
  { id: 1, name: "Summer Music Festival", category: "Music", date: "2026-07-15", seats: 30, location: "Central Park" },
  { id: 2, name: "Food Street Carnival",  category: "Food",  date: "2026-08-10", seats: 0,  location: "Town Square" },
  { id: 3, name: "Basketball Tournament", category: "Sports",date: "2026-06-20", seats: 15, location: "Sports Complex" },
  { id: 4, name: "Jazz Night",            category: "Music", date: "2025-01-10", seats: 10, location: "City Hall" },
  { id: 5, name: "Baking Workshop",       category: "Food",  date: "2026-09-05", seats: 20, location: "Community Center" },
  { id: 6, name: "Cricket League",        category: "Sports",date: "2026-07-01", seats: 40, location: "Stadium" },
];

// if-else: check if an event is valid (upcoming AND has seats)
function isValidEvent(event) {
  const eventDateTime = new Date(event.date);
  if (eventDateTime < today) {
    return false; // past event — hide it
  } else if (event.seats <= 0) {
    return false; // no seats — hide it
  } else {
    return true;  // valid upcoming event
  }
}

// forEach loop: go through the event list and log valid ones
console.log("--- Valid Upcoming Events ---");
eventList.forEach(function (event) {
  if (isValidEvent(event)) {
    console.log(`✅ ${event.name} on ${event.date} — ${event.seats} seats left`);
  } else {
    console.log(`❌ ${event.name} — hidden (past or full)`);
  }
});

// try-catch: wrap registration logic to handle errors safely
function safeRegister(eventId, userName) {
  try {
    if (!userName || userName.trim() === "") {
      throw new Error("User name cannot be empty.");
    }
    const event = eventList.find(e => e.id === eventId);
    if (!event) {
      throw new Error(`Event with ID ${eventId} not found.`);
    }
    if (!isValidEvent(event)) {
      throw new Error(`Cannot register: "${event.name}" is full or already past.`);
    }
    event.seats--;
    console.log(`✅ ${userName} successfully registered for "${event.name}". Seats left: ${event.seats}`);
    return true;
  } catch (error) {
    console.error("Registration Error:", error.message);
    return false;
  }
}

// Test the safe register function
safeRegister(1, "Arun Kumar");   // should succeed
safeRegister(2, "Priya");        // should fail (no seats)
safeRegister(4, "Raj");          // should fail (past event)
safeRegister(1, "");             // should fail (empty name)


// TASK 4: Functions, Scope, Closures, Higher-Order Functions

// addEvent(): add a new event to the list
function addEvent(name, category, date, seats, location) {
  const newEvent = {
    id: eventList.length + 1,
    name: name,
    category: category,
    date: date,
    seats: seats,
    location: location
  };
  eventList.push(newEvent); // Task 6: push
  console.log("New event added:", newEvent.name);
  return newEvent;
}

// registerUser(): register a user by name and event id
function registerUser(userName, eventId) {
  return safeRegister(eventId, userName);
}

// filterEventsByCategory(): higher-order function using a callback
function filterEventsByCategory(category, callbackFn) {
  const filtered = eventList.filter(event => event.category === category);
  return filtered.map(callbackFn); // pass each result through the callback
}

// Closure: track total registrations per category privately
function createCategoryTracker(category) {
  let totalRegistrations = 0; // private variable inside the closure

  return {
    register: function () {
      totalRegistrations++;
      console.log(`[${category}] Total registrations so far: ${totalRegistrations}`);
    },
    getCount: function () {
      return totalRegistrations;
    }
  };
}

// Create trackers for each category
const musicTracker  = createCategoryTracker("Music");
const foodTracker   = createCategoryTracker("Food");
const sportsTracker = createCategoryTracker("Sports");

// Simulate a few registrations to test the closure
musicTracker.register();
musicTracker.register();
foodTracker.register();
console.log("Music registrations:", musicTracker.getCount()); // 2
console.log("Food registrations:",  foodTracker.getCount());  // 1



// TASK 5: Objects and Prototypes


// Event constructor / class
class Event {
  constructor(id, name, category, date, seats, location) {
    this.id       = id;
    this.name     = name;
    this.category = category;
    this.date     = date;
    this.seats    = seats;
    this.location = location;
  }

  // Method on the prototype
  checkAvailability() {
    const eventDateTime = new Date(this.date);
    if (eventDateTime < today) {
      return `"${this.name}" is a past event.`;
    } else if (this.seats <= 0) {
      return `"${this.name}" is fully booked.`;
    } else {
      return `"${this.name}" has ${this.seats} seats available.`;
    }
  }
}

// Create an instance and test it
const sampleEvent = new Event(99, "Heritage Walk", "Cultural", "2026-10-10", 25, "Old Town");
console.log(sampleEvent.checkAvailability());

// Object.entries(): list all keys and values of the event
console.log("--- Event Object Entries ---");
Object.entries(sampleEvent).forEach(([key, value]) => {
  console.log(`  ${key}: ${value}`);
});



// TASK 6: Arrays and Methods


// Add a new event using .push()
addEvent("Street Food Fiesta", "Food", "2026-11-20", 60, "Beach Road");
console.log("Total events in list:", eventList.length);

// .filter(): show only Music events
const musicEvents = eventList.filter(event => event.category === "Music");
console.log("Music Events:", musicEvents.map(e => e.name));

// .map(): format event names into display-friendly strings
const formattedEvents = eventList.map(event => `${event.category} — ${event.name}`);
console.log("Formatted Events:", formattedEvents);



// TASK 7: DOM Manipulation


function renderEventCards() {
  // Look for a container in the DOM to place cards
  // We'll create one dynamically under the #events section
  const eventsSection = document.querySelector("#events");
  if (!eventsSection) return;

  // Remove old cards container if it exists (for re-renders)
  const existing = document.getElementById("eventCardsContainer");
  if (existing) existing.remove();

  // Create a container div
  const container = document.createElement("div");
  container.id = "eventCardsContainer";
  container.style.cssText = "display:flex; flex-wrap:wrap; gap:16px; margin:20px 0;";

  // Only show valid (upcoming + seats > 0) events
  const validEvents = eventList.filter(isValidEvent);

  validEvents.forEach(event => {
    // Create card element
    const card = document.createElement("div");
    card.className = "eventCard";
    card.style.cssText = "min-width:220px; flex:1;";

    card.innerHTML = `
      <h3 style="color:#7700cc; margin-bottom:6px;">${event.name}</h3>
      <p>📅 <strong>Date:</strong> ${event.date}</p>
      <p>🏷️ <strong>Category:</strong> ${event.category}</p>
      <p>📍 <strong>Location:</strong> ${event.location}</p>
      <p>💺 <strong>Seats Left:</strong> <span id="seats-${event.id}">${event.seats}</span></p>
      <button 
        id="registerBtn-${event.id}" 
        onclick="handleCardRegister(${event.id})"
        style="margin-top:10px; width:100%;">
        Register
      </button>
    `;

    container.appendChild(card);
  });

  // Insert the cards container after the table
  eventsSection.appendChild(container);
  console.log(`Rendered ${validEvents.length} event cards.`);
}

// Update UI when a user registers via a card button (Task 7 + 8)
function handleCardRegister(eventId) {
  const event = eventList.find(e => e.id === eventId);
  if (!event) return;

  try {
    if (event.seats <= 0) throw new Error("No seats available.");
    event.seats--;

    // Update the seat count in the DOM
    const seatsEl = document.getElementById(`seats-${eventId}`);
    if (seatsEl) seatsEl.textContent = event.seats;

    // If no seats left, update button
    if (event.seats === 0) {
      const btn = document.getElementById(`registerBtn-${eventId}`);
      if (btn) {
        btn.textContent = "Fully Booked";
        btn.disabled = true;
        btn.style.backgroundColor = "#aaa";
      }
    }

    // Track with closure tracker
    if      (event.category === "Music")  musicTracker.register();
    else if (event.category === "Food")   foodTracker.register();
    else if (event.category === "Sports") sportsTracker.register();

    alert(`✅ You have registered for "${event.name}"!`);
  } catch (err) {
    alert("❌ Registration failed: " + err.message);
  }
}



// TASK 8: Event Handling

// Add a search bar + category filter dynamically above the event cards
document.addEventListener("DOMContentLoaded", function () {

  const eventsSection = document.querySelector("#events");
  if (!eventsSection) return;

  // --- Category Filter (onchange) ---
  const filterWrapper = document.createElement("div");
  filterWrapper.style.cssText = "margin:15px 0; display:flex; gap:12px; align-items:center; flex-wrap:wrap;";

  const filterLabel = document.createElement("label");
  filterLabel.textContent = "Filter by Category: ";
  filterLabel.style.fontWeight = "bold";

  const filterSelect = document.createElement("select");
  filterSelect.id = "categoryFilter";
  filterSelect.style.cssText = "padding:8px 12px; border-radius:8px; border:1px solid #ccc; font-family:Poppins,sans-serif;";
  ["All", "Music", "Food", "Sports"].forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    filterSelect.appendChild(opt);
  });

  // onchange: filter event cards by selected category
  filterSelect.onchange = function () {
    const selected = this.value;
    const cards = document.querySelectorAll(".eventCard");
    cards.forEach(card => {
      const categoryText = card.querySelector("p:nth-child(3)").textContent;
      if (selected === "All" || categoryText.includes(selected)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  };

  // --- Search Box (keydown) ---
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.id = "searchInput";
  searchInput.placeholder = "🔍 Search events by name...";
  searchInput.style.cssText = "padding:8px 12px; border-radius:8px; border:1px solid #ccc; font-family:Poppins,sans-serif; flex:1; min-width:200px;";

  // keydown: search events as user types
  searchInput.addEventListener("keydown", function () {
    // Use setTimeout so we read the value after the key is processed
    setTimeout(() => {
      const query = this.value.toLowerCase();
      const cards = document.querySelectorAll(".eventCard");
      cards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = title.includes(query) ? "block" : "none";
      });
    }, 0);
  });

  filterWrapper.appendChild(filterLabel);
  filterWrapper.appendChild(filterSelect);
  filterWrapper.appendChild(searchInput);

  // Insert filter bar before the event cards section
  eventsSection.appendChild(filterWrapper);
});



// TASK 9: Async JS, Promises, Async/Await

// Mock JSON endpoint (using a public free mock API)
const MOCK_API_URL = "https://jsonplaceholder.typicode.com/posts?_limit=3";

// --- Using .then() and .catch() ---
function fetchEventsWithPromise() {
  console.log("Fetching events with Promise (.then/.catch)...");
  fetch(MOCK_API_URL)
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json();
    })
    .then(data => {
      console.log("Events fetched (Promise):", data);
    })
    .catch(error => {
      console.error("Fetch error (Promise):", error.message);
    });
}

// --- Using async/await with loading spinner ---
async function fetchEventsWithAsync() {
  // Show a loading spinner in the events section
  const eventsSection = document.querySelector("#events");
  let spinner = null;

  if (eventsSection) {
    spinner = document.createElement("p");
    spinner.id = "loadingSpinner";
    spinner.textContent = "⏳ Loading events...";
    spinner.style.cssText = "text-align:center; color:#7700cc; font-weight:bold; margin:10px 0;";
    eventsSection.appendChild(spinner);
  }

  try {
    const response = await fetch(MOCK_API_URL);
    if (!response.ok) throw new Error("Failed to fetch events.");
    const data = await response.json();
    console.log("Events fetched (async/await):", data);
  } catch (error) {
    console.error("Async fetch error:", error.message);
  } finally {
    // Remove spinner when done
    if (spinner) spinner.remove();
  }
}

// Call the async fetch function
fetchEventsWithAsync();



// TASK 10: Modern JavaScript (ES6+ Features)


// Default parameters in functions
function createEventCard(name, category = "General", seats = 20) {
  return { name, category, seats }; // shorthand property names (ES6)
}

const newCard = createEventCard("Art Exhibition");
console.log("New card with defaults:", newCard);

// Destructuring: extract event details from an object
const { name: evtName, category: evtCategory, date: evtDate } = eventList[0];
console.log(`Destructured → Name: ${evtName}, Category: ${evtCategory}, Date: ${evtDate}`);

// Spread operator: clone event list before filtering (non-destructive)
const clonedList = [...eventList];
const upcomingClone = clonedList.filter(isValidEvent);
console.log("Cloned & filtered list length:", upcomingClone.length);

// Arrow functions (ES6) — already used throughout, shown explicitly here
const getEventNames = (list) => list.map(e => e.name);
console.log("All event names:", getEventNames(eventList));



// TASK 11: Working with Forms

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // prevent default page reload

    // Access inputs using form.elements
    const elements = form.elements;
    const nameVal  = elements[0].value.trim();  // Name input
    const emailVal = elements[1].value.trim();  // Email input
    const phoneVal = document.getElementById("phone").value.trim();
    const eventType = document.getElementById("eventType").value;

    // Clear old inline errors
    clearFormErrors();

    let hasError = false;

    // Validate: Name
    if (!nameVal) {
      showInlineError(elements[0], "⚠️ Name is required.");
      hasError = true;
    }

    // Validate: Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal) {
      showInlineError(elements[1], "⚠️ Email is required.");
      hasError = true;
    } else if (!emailRegex.test(emailVal)) {
      showInlineError(elements[1], "⚠️ Please enter a valid email address.");
      hasError = true;
    }

    // Validate: Phone (optional but must be 10 digits if provided)
    if (phoneVal && !/^\d{10}$/.test(phoneVal)) {
      showInlineError(document.getElementById("phone"), "⚠️ Phone must be 10 digits.");
      hasError = true;
    }

    if (hasError) return;

    // Success — show result message
    const result = document.getElementById("result");
    if (result) {
      result.textContent = `✅ ${nameVal}, you have registered for the ${eventType} event!`;
    }

    // Log form submission steps (Task 13: Debugging)
    console.log("Form submitted:");
    console.log("  Name:", nameVal);
    console.log("  Email:", emailVal);
    console.log("  Phone:", phoneVal || "Not provided");
    console.log("  Event Type:", eventType);

    // Also send data via Fetch POST (Task 12)
    postRegistrationData({ name: nameVal, email: emailVal, phone: phoneVal, eventType });
  });
});

// Helper: show an inline error message below an input
function showInlineError(inputEl, message) {
  const errorEl = document.createElement("span");
  errorEl.className = "inline-error";
  errorEl.textContent = message;
  errorEl.style.cssText = "color:red; font-size:0.82rem; display:block; margin-top:-10px; margin-bottom:8px;";
  inputEl.insertAdjacentElement("afterend", errorEl);
}

// Helper: remove all inline error messages
function clearFormErrors() {
  document.querySelectorAll(".inline-error").forEach(el => el.remove());
}



// TASK 12: AJAX & Fetch API — POST Registration Data


async function postRegistrationData(userData) {
  const resultEl = document.getElementById("result");

  // Show "sending" state
  if (resultEl) resultEl.textContent = "⏳ Sending registration...";

  // Simulate a delayed server response with setTimeout
  await new Promise(resolve => setTimeout(resolve, 1500));

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });

    if (!response.ok) throw new Error("Server error: " + response.status);

    const data = await response.json();
    console.log("✅ POST successful. Server response:", data);

    // Show success message
    if (resultEl) {
      resultEl.textContent = `✅ Registration confirmed for ${userData.name}! (ID: ${data.id})`;
      resultEl.style.color = "green";
    }
  } catch (error) {
    console.error("❌ POST failed:", error.message);

    // Show failure message
    if (resultEl) {
      resultEl.textContent = "❌ Registration failed. Please try again.";
      resultEl.style.color = "red";
    }
  }
}

 
// TASK 13: Debugging and Testing


// Breakpoint-friendly function — open DevTools (F12) and set a breakpoint here
function debugRegistration(formData) {
  console.log("--- DEBUG: Registration Start ---");
  console.log("Step 1 — Form data received:", formData);

  const event = eventList.find(e => e.category === formData.eventType);
  console.log("Step 2 — Matched event object:", event);

  if (!event) {
    console.warn("Step 3 — No matching event found in list.");
    return;
  }

  console.log("Step 3 — Checking seat availability:", event.seats);

  if (event.seats <= 0) {
    console.error("Step 4 — Event is fully booked.");
    return;
  }

  console.log("Step 4 — Proceeding to register user.");
  console.log("--- DEBUG: Registration End ---");
}

// Verify fetch payload structure
function checkFetchPayload(payload) {
  console.log("--- Fetch Request Payload ---");
  console.log(JSON.stringify(payload, null, 2));
}



// TASK 14: jQuery and JS Frameworks

(function loadJQuery() {
  if (window.jQuery) {
    initJQuery();
    return;
  }
  const script = document.createElement("script");
  script.src = "https://code.jquery.com/jquery-3.7.1.min.js";
  script.onload = initJQuery;
  document.head.appendChild(script);
})();

function initJQuery() {
  console.log("jQuery loaded:", $.fn.jquery);

  // Use jQuery click handler for the register button in the form
  $(document).on("click", "#registrationForm button[type='submit']", function () {
    console.log("jQuery: Register button clicked.");
  });

  
  $("#categoryFilter").on("change", function () {
    const selected = $(this).val();
    $(".eventCard").each(function () {
      const categoryText = $(this).find("p:nth-child(3)").text();
      if (selected === "All" || categoryText.includes(selected)) {
        $(this).fadeIn(400);
      } else {
        $(this).fadeOut(300);
      }
    });
  });

 
  console.log("jQuery event handlers initialized.");
}
